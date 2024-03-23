import dbConnect from "../../../database/dbConnect";
import Sms from "../../../database/models/sms";

import SMSService from "@/assets/utilities/sms";

export default async function handler(req, res) {
  await dbConnect();

  const sms = new SMSService(process.env.SMS_KEY);

  if (req.method != "POST") throw Error("Request Method is not acceptable");
  const { number, message } = req.body;

  return await sms
    .sendMessage(number, message)
    .then(async (e) => {
      return await Sms({
        ...req.body,
        createdAt: new Data(e.data?.timestamp),
      })
        .save()
        .then(() => {
          return res.json({
            success: true,
            message: "Sent Successfully",
          });
        })
        .catch((e) => {
          return res.json({
            success: false,
            message: "Error in the Server.",
          });
        });
    })
    .catch((e) => {
      return res.json({
        success: false,
        message: e.message,
      });
    });
}
