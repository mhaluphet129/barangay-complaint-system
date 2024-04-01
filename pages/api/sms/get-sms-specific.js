import dbConnect from "../../../database/dbConnect";
import SMS from "../../../database/models/sms";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");

  const { residentId, residentNumber, number, adminId } = req.query;
  let query = {};
  console.log(req.query);
  if (residentId)
    query = {
      $or: [
        {
          $and: [{ originator: adminId }, { number: residentNumber }],
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
