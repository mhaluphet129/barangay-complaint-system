import dbConnect from "../../../database/dbConnect";
import Admin from "../../../database/models/admin";

import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "POST") throw Error("Request Method is not acceptable");

  let existingAdmin = await Admin.findOne({ email: req.body.email });

  if (existingAdmin) {
    res.json({
      success: false,
      message: "Email is already taken",
    });
    return;
  }

  let encryptedPassword = await bcrypt.hash(req.body.password, 8);
  return await Admin({ ...req.body, password: encryptedPassword })
    .save()
    .then(() => {
      res.json({
        success: true,
        message: "Successfully Created",
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
