import dbConnect from "../../../database/dbConnect";
import Residents from "../../../database/models/resident";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");

  return await Residents.find()
    .then((doc) => {
      res.json({
        success: true,
        residents: doc,
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
