import dbConnect from "@/database/dbConnect";
import Pin from "@/database/models/pin";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");
  const { residentId, pin } = req.query;

  return await Pin.findOne({
    residentId,
    pin,
  })

    .then(async (doc) => {
      if (doc) {
        if (doc.isConfirmed) {
          return res.json({
            success: false,
            message: "Pin already confirmed",
          });
        } else {
          await Pin.findOneAndUpdate({ _id: doc._id }, { isConfirmed: true });
          return res.json({
            success: true,
            message: "Pin confirmed",
            pin,
          });
        }
      } else {
        return res.json({
          success: false,
          message: "Invalid code",
          pin,
        });
      }
    })
    .catch((e) => {
      res.json({
        error: Object.keys(e.errors),
        success: false,
        message: "Error in the Server.",
      });
    });
}
