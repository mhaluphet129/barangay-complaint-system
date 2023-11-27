import dbConnect from "../../../database/dbConnect";
import Admin from "../../../database/models/admin";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "DELETE") throw Error("Request Method is not acceptable");

  return await Residents.Admin({ _id: req.query.id })
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
