import dbConnect from "@/database/dbConnect";
import Complaint from "@/database/models/complaint";
import SMS from "@/database/models/sms";
import jason from "@/assets/json/constant.json";

// TODO: add sms here

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "POST") throw Error("Request Method is not acceptable");

  let newComplain = null;

  // init settlement
  const newSettlement = {
    type: "processed",
  };

  if (req.body.template) {
    const {
      residentId,
      inchargeId,
      description,
      respondentName,
      respondentNumber,
      images,
      type,
    } = req.body;
    // get an SMS template and create an SMS and send to the respondent
    let msgTemplate = jason.sms_formats.filter(
      (e) => e.type == template /* "sms_to_respondent_1" */
    )[0].message;

    let newSms = await SMS.create({
      message: msgTemplate.replace(/@RESPONDER_NAME/g, respondentName),
      number: respondentNumber,
      residentId,
    });

    newComplain = Complaint({
      smsId: [newSms._id],
      residentId,
      settlement: [newSettlement],
      inchargeId,
      respondentName,
      respondentNumber,
      description,
      images,
      type,
    });
  } else {
    newComplain = Complaint({
      ...req.body,
      settlement: [newSettlement],
      type: "sms",
    });
  }

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
