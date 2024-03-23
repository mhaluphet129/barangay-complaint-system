import dbConnect from "../../../database/dbConnect";
import Complain from "../../../database/models/complaint";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");

  let { number } = req.query;

  return await Complain.findOne({ respondentNumber: number, type: "sms" })
    .then((e) => {
      return res.json({
        success: true,
        message: "Sent Successfully",
        isRegistered: e != null,
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
