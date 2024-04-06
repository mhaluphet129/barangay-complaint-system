import dbConnect from "@/database/dbConnect";
import Residents from "@/database/models/resident";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");

  const { searchKeyword } = req.query;
  var re = new RegExp(searchKeyword.toLowerCase().trim(), "i");

  return await Residents.find({
    $and: [
      {
        $or: [
          { name: { $regex: re } },
          { lastname: { $regex: re } },
          { middlename: { $regex: re } },
          { phoneNumber: { $regex: re } },
          { email: { $regex: re } },
        ],
      },
    ],
  })
    .collation({ locale: "en" })
    .sort({ name: 1 })
    .then((e) => res.json({ status: 200, searchData: e }))
    .catch((err) =>
      res.status(500).json({ success: false, message: "Error: " + err })
    );
}
