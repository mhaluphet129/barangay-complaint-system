import dbConnect from "../../../database/dbConnect";
import Admin from "../../../database/models/admin";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");

  return await Admin.find()
    .then((doc) => {
      res.json({
        success: true,
        admins: doc,
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
