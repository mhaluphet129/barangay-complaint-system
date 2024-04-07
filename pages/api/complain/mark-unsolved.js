import dbConnect from "../../../database/dbConnect";
import Complain from "../../../database/models/complaint";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");
  const { _id } = req.query;

  return await Complain.findOneAndUpdate(
    { _id },
    {
      $push: {
        settlement: {
          type: "unsolved",
          description:
            "Respondent didn't respondent. Admin set this to unsolved",
        },
      },
    }
  )
    .then(() =>
      res.json({
        success: true,
        message: "Successfully Updated",
      })
    )
    .catch((e) => {
      console.log(e);
      return res.json({
        success: false,
        message: "Error in the Server.",
      });
    });
}
