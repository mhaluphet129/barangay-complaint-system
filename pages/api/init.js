import dbConnect from "../../database/dbConnect";
import Admin from "@/database/models/admin";

export default async function handler(req, res) {
  return await dbConnect().then(async (e) => {
    let adminCount = await Admin.countDocuments();

    if (adminCount < 1) {
      let newAdmin = Admin({
        username: "admin",
        email: "admin@email.com",
        password:
          "$2a$08$/oIrIPjhdvDzCthpYQXUOOkMmwjAcIUtvElC1dHSyiH8N1KjNzrrm", //hashed
        name: "Name",
        middlename: "MiddleName",
        lastname: "LastName",
      });

      await newAdmin.save();
    }

    res.json({
      success: true,
      message: "Connection status success",
    });
  });
}
