import dbConnect from "@/database/dbConnect";
import Complain from "@/database/models/complaint";
import Resident from "@/database/models/resident";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");

  return await Complain.find()
    .populate("residentId")
    .then((doc) => {
      res.json({
        success: true,
        complain: doc,
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        success: false,
        message: "Error in the Server.",
      });
    });
}
