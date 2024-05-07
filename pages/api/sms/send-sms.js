import dbConnect from "../../../database/dbConnect";
import Sms from "../../../database/models/sms";

import SMSService from "@/assets/utilities/sms";
import { parsedPhoneNumber } from "@/assets/utilities/phonenumber_utils";

export default async function handler(req, res) {
  await dbConnect();

  const sms = new SMSService(process.env.SMS_KEY);

  if (req.method != "POST") throw Error("Request Method is not acceptable");
  const { number, message, device } = req.body;

  return await sms
    .sendMessage(parsedPhoneNumber(number), message, device)
    .then(async (e) => {
      return await Sms({ ...req.body, type: "outbound" })
        .save()
        .then(() => {
          return res.json({
            success: true,
            message: "Sent Successfully",
          });
        })
        .catch((e) => {
          console.log(e);
          return res.json({
            success: false,
            message: "Phone SMS Service not activated",
          });
        });
    })
    .catch((e) => {
      console.log(e);
      return res.json({
        success: false,
        message: e?.message ?? "Error",
      });
    });
}
