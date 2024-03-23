import dbConnect from "../../../database/dbConnect";
import Sms from "../../../database/models/sms";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "POST") throw Error("Request Method is not acceptable");
  const { timestamp, phone } = req.body;
  return await Sms({
    ...req.body,
    createdAt: new Date(timestamp),
    number: phone,
  })
    .save()
    .then((doc) =>
      res.json({
        sms: doc,
        success: true,
        message: "Created Successfully",
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
