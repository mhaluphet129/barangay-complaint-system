import dbConnect from "../../database/dbConnect";

export default async function handler(req, res) {
  return await dbConnect().then((e) => {
    res.json({
      success: true,
      message: "Connection status success",
    });
  });
}
