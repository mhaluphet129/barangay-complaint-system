import dbConnect from "../../../database/dbConnect";
import Complain from "../../../database/models/complaint";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");
  const { _id } = req.query;

  return await Complain.findOneAndUpdate({ _id }, { isResponded: true })
    .then(() => {
      res.json({
        success: true,
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
