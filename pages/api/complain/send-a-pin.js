import dbConnect from "@/database/dbConnect";
import Pin from "@/database/models/pin";

// TODO: sent an sms here

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "POST") throw Error("Request Method is not acceptable");
  const { id } = req.body;
  const pin = Math.floor(100000 + Math.random() * 900000);

  return await Pin({
    residentId: id,
    pin,
  })
    .save()
    .then(() => {
      res.json({
        success: true,
        message: "Code is sent to resident number. please check.",
        pin,
      });
    })
    .catch((e) => {
      res.json({
        error: Object.keys(e.errors),
        success: false,
        message: "Error in the Server.",
      });
    });
}
