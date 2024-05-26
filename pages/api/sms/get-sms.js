import dbConnect from "../../../database/dbConnect";
import SMS from "../../../database/models/sms";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");

  return await SMS.aggregate([
    { $match: { type: req.query.type } },
    { $sort: { createdAt: -1 } },
    {
      $addFields: {
        updatedLocalField: {
          $cond: [
            { $eq: [{ $substr: ["$number", 0, 2] }, "09"] },
            { $substr: ["$number", 1, { $strLenCP: "$number" }] },
            {
              $cond: [
                { $eq: [{ $substr: ["$number", 0, 3] }, "639"] },
                { $substr: ["$number", 2, { $strLenCP: "$number" }] },
                "$number",
              ],
            },
          ],
        },
      },
    },
    {
      $lookup: {
        from: "complaints",
        localField: "updatedLocalField",
        foreignField: "respondentNumber",
        as: "complainer",
      },
    },
    {
      $project: {
        originator: 1,
        residentId: 1,
        message: 1,
        number: 1,
        keywords: 1,
        toComplain: 1,
        type: 1,
        complainer: { $arrayElemAt: ["$complainer", 0] },
      },
    },
  ])
    .then((e) => {
      return res.json({
        success: true,
        message: "Sent Successfully",
        sms: e,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.json({
        success: false,
        message: "Error in the Server.",
      });
    });
}
