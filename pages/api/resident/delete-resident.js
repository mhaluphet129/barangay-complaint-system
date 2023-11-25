import dbConnect from "../../../database/dbConnect";
import Residents from "../../../database/models/resident";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "DELETE") throw Error("Request Method is not acceptable");

  return await Residents.findOneAndDelete({ _id: req.query.id })
    .then(() => {
      res.json({
        success: true,
        message: "Successfully Deleted",
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
