import dbConnect from "../../../database/dbConnect";
import Sms from "../../../database/models/sms";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "POST") throw Error("Request Method is not acceptable");
  return await Sms(req.body)
    .save()
    .then(() => {
      res.json({
        success: true,
        message: "Sent Successfully",
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        success: false,
        message: "Error in the Server.",
      });
    });
}
