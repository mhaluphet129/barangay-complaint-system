import dbConnect from "@/database/dbConnect";
import Complain from "@/database/models/complaint";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "POST") throw Error("Request Method is not acceptable");
  const { id, number } = req.body;

  return await Complain.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        respondentNumber: number,
      },
    }
  )
    .then(() => {
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
