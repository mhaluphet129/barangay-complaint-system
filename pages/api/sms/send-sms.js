import dbConnect from "../../../database/dbConnect";
import Sms from "../../../database/models/sms";
import dayjs from "dayjs";

import SMSService from "@/pages/assets/utilities/sms";

export default async function handler(req, res) {
  await dbConnect();

  const sms = new SMSService(process.env.SMS_KEY);

  if (req.method != "POST") throw Error("Request Method is not acceptable");
  const { number, message } = req.body;

  return await sms.sendMessage(number, message).then(async (e) => {
    console.log(e);
    if (e.success) {
      return await Sms({
        ...req.body,
        createdAt: dayjs.unix(e.data?.timestamp).toDate(),
      })
        .save()
        .then(() => {
          // * check if already have convo with this phone number, otherwise create a new one
          // * (flow) check if phone is associated to any resident registered, otherwise create temporary
          // * account to using those number, get the id of that new account and create a new convi with the sender..
          return res.json({
            success: true,
            message: "Sent Successfully",
          });
        })
        .catch((e) => {
          console.log(e);
          return res.json({
            success: false,
            message: "Error in the Server.",
          });
        });
    } else {
      return res.json({
        success: false,
        message: e.message,
      });
    }
  });
}
