import dbConnect from "../../../database/dbConnect";
import SMS from "../../../database/models/sms";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");

  const { residentId, residentNumber, number, adminId } = req.query;
  let query = {};

  if (residentId)
    query = {
      $or: [
        {
          $and: [{ originator: adminId }, { number: residentNumber }],
        },
        {
          number: `63${residentNumber}`,
        },
        { residentId },
      ],
    };
  else
    query = {
      $or: [
        {
          $and: [{ originator: adminId }, { number }],
        },
        {
          number,
        },
        {
          number: `63${number}`,
        },
      ],
    };

  return await SMS.find(query)
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
