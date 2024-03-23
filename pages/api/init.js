import dbConnect from "../../database/dbConnect";
import Admin from "@/database/models/admin";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  return await dbConnect().then(async (e) => {
    let adminCount = await Admin.countDocuments({ role: "superadmin" });

    if (adminCount < 1) {
      let newAdmin = Admin({
        username: "admin",
        email: "admin@email.com",
        name: "Name",
        middlename: "MiddleName",
        lastname: "LastName",
        role: "superadmin",
      });
      newAdmin.password = await bcrypt.hash("password", 8);
      await newAdmin.save();
    }

    res.json({
      success: true,
      message: "Connection status success",
    });
  });
}
