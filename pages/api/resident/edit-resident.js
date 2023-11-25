import dbConnect from "../../../database/dbConnect";
import Residents from "../../../database/models/resident";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "POST") throw Error("Request Method is not acceptable");

  return await Residents.findOneAndUpdate({ _id: req.body._id }, req.body)
    .then(() => {
      res.json({
        success: true,
        message: "Updated Successfully",
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
