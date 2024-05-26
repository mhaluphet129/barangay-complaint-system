import dbConnect from "../../../database/dbConnect";
import SMS from "@/database/models/sms";
import Resident from "@/database/models/resident";
import Complain from "@/database/models/complaint";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");
  const { number, message } = req.query;
  let complain = null;

  const parsedNum = parsedPhoneNumber(number);

  let resident = await Resident.findOne({
    $or: [{ phoneNumber: number }, { phoneNumber: parsedNum }],
  });

  if (parsedNum != "") {
    complain = await Complain.findOne({ complainerNumber: parsedNum });
  }

  return await SMS.create({
    ...(resident ? resident._id : {}),
    ...(complain
      ? {
          toComplain: true,
        }
      : {}),
    message,
    number: resident ? resident.phoneNumber : number.slice(1),
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

const parsedPhoneNumber = (num) => {
  if (num.startsWith("09")) return num.slice(1);
  if (num.startsWith("639")) return num.slice(2);
  return num;
};
