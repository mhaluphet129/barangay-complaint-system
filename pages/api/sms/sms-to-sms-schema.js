import dbConnect from "../../../database/dbConnect";
import SMS from "@/database/models/sms";
import Resident from "@/database/models/resident";
import Complain from "@/database/models/complaint";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");
  const { number, message } = req.query;
  let parsedNum = "",
    complain = null;
  if (number.startsWith("+639")) parsedNum = `0${number.slice(3)}`;

  let resident = await Resident.findOne({
    $or: [{ phoneNumber: number }, { phoneNumber: parsedNum }],
  });

  if (parsedNum != "") {
    complain = await Complain.findOne({ respondentNumber: parsedNum });
  }

  return await SMS.create({
    ...(resident ? resident._id : {}),
    ...(complain
      ? {
          toComplain: true,
        }
      : {}),
    message,
    number: number.slice(1),
    type: "inbound",
  })
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
