import dbConnect from "../../../database/dbConnect";
import Admin from "../../../database/models/admin";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_PRIVATE_KEY = "okay";

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { email, password } = req.body;

  if (method === "POST") {
    const validUser = await Admin.findOne({ email }).lean();

    if (validUser) {
      const validPassword = await bcrypt.compare(password, validUser.password);

      if (validPassword) {
        delete validUser.password;
        delete validUser.createdAt;
        delete validUser.updatedAt;
        delete validUser.__v;

        const token = jwt.sign(validUser, JWT_PRIVATE_KEY);
        res.json({
          jwt: token,
          userData: validUser,
          status: 200,
          message: "Login Success",
        });
      } else {
        res.json({ message: "Wrong Password", status: 452 });
      }
    } else {
      res.json({ message: "Account doesn't exist", status: 451 });
    }
  } else {
    res.json({ success: false, status: 404 });
  }
}
