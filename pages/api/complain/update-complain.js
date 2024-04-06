import dbConnect from "@/database/dbConnect";
import Complain from "@/database/models/complaint";
import SMS from "@/database/models/sms";
import Resident from "@/database/models/resident";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "POST") throw Error("Request Method is not acceptable");
  const { _id, numberToBeReplaced } = req.body;

  return await Complain.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      $set: req.body,
    }
  )
    .then(async () => {
      if (req.body.residentId) {
        let resident = await Resident.findOne({ _id: req.body.residentId });
        await SMS.updateMany(
          { number: numberToBeReplaced },
          {
            $set: {
              number: `63${resident.phoneNumber}`,
              residentId: req.body.residentId,
            },
          }
        );
      }

      res.json({
        success: true,
        message: "Successfully Updated",
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
