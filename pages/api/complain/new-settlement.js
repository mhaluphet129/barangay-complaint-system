import dbConnect from "@/database/dbConnect";
import Complain from "@/database/models/complaint";
import SMS from "@/database/models/sms";
import Resident from "@/database/models/resident";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "POST") throw Error("Request Method is not acceptable");
  const { id, newSettlement } = req.body;

  return await Complain.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: { settlement: newSettlement },
    },
    { new: true }
  )
    .then(async (e) =>
      res.json({
        success: true,
        message: "Successfully Updated",
        data: e.settlement,
      })
    )
    .catch((e) => {
      res.json({
        error: Object.keys(e.errors),
        success: false,
        message: "Error in the Server.",
      });
    });
}
