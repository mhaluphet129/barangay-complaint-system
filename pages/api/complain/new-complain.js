import dbConnect from "@/database/dbConnect";
import Complaint from "@/database/models/complaint";
import SMS from "@/database/models/sms";
import jason from "@/pages/assets/json/constant.json";

// TODO: add sms here

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "POST") throw Error("Request Method is not acceptable");
  const {
    residentId,
    inchargeId,
    description,
    respondentName,
    respondentNumber,
  } = req.body;

  // get an SMS template and create an SMS and send to the respondent
  let msgTemplate = jason.sms_formats.filter(
    (e) => e.type == "sms_to_respondent_1"
  )[0].message;

  let newSms = await SMS.create({
    message: msgTemplate.replace(/@RESPONDER_NAME/g, respondentName),
    number: respondentNumber,
    residentId,
  });

  // create init settlement
  const newSettlement = {
    type: "processed",
    description,
  };

  let newComplain = Complaint({
    smsId: [newSms._id],
    residentId,
    settlement: [newSettlement],
    inchargeId,
    respondentName,
    respondentNumber,
  });
  return await newComplain
    .save()
    .then(() => {
      res.json({
        success: true,
        message: "Created Successfully",
      });
    })
    .catch((e) => {
      res.json({
        error: Object.keys(e.errors),
        success: false,
        message: "Error in the Server.",
      });
    });
}
