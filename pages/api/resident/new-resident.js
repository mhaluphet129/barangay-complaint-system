import dbConnect from "../../../database/dbConnect";
import Residents from "../../../database/models/resident";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "POST") throw Error("Request Method is not acceptable");

  return await Residents(req.body)
    .save()
    .then(() => {
      res.json({
        success: true,
        message: "Created Successfully",
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
