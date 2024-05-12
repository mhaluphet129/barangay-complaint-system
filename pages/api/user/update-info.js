import dbConnect from "@/database/dbConnect";
import Admin from "@/database/models/admin";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "PUT") throw Error("Request Method is not acceptable");

  // this is password change
  if (req.body?.oldPassword && req.body?._id) {
    let admin = await Admin.findOne({ _id: req.body._id });

    if (admin) {
      const validPassword = await bcrypt.compare(
        req.body.oldPassword,
        admin.password
      );

      if (validPassword) {
        let encryptedPassword = await bcrypt.hash(req.body.newPassword, 8);
        req.body.password = encryptedPassword;
      } else {
        res.json({
          success: false,
          code: 404,
          message: "Wrong Old Password",
        });
      }
    } else {
      res.json({
        success: false,
        code: 404,
        message: "Admin not found",
      });
    }
  }

  return await Admin.findOneAndUpdate({ _id: req.body._id }, req.body, {
    returnOriginal: false,
  })
    .then((e) => {
      res.json({
        success: true,
        code: 200,
        message: "Updated Successfully",
        user: e,
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        success: false,
        code: 500,
        message: "Error in the Server.",
      });
    });
}
