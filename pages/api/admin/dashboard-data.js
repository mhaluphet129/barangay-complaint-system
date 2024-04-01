import dbConnect from "../../../database/dbConnect";
import SMS from "@/database/models/sms";
import Complain from "@/database/models/complaint";
import Resident from "@/database/models/resident";
import Admin from "@/database/models/admin";
import Complaint from "@/database/models/complaint";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");
  let smsCount = 0;
  let complainCount = 0;
  let residentsCount = 0;
  let adminCount = 0;

  try {
    smsCount = await SMS.countDocuments();
    complainCount = await Complain.countDocuments();
    residentsCount = await Resident.countDocuments();
    adminCount = await Admin.countDocuments({ role: "admin" });

    let pieData = await Complaint.aggregate([
      {
        $project: {
          lastStatus: { $arrayElemAt: ["$settlement", -1] },
        },
      },
      {
        $group: {
          _id: "$lastStatus.type",
          count: { $sum: 1 },
        },
      },
    ]);

    return res.json({
      success: true,
      data: {
        smsCount,
        complainCount,
        residentsCount,
        adminCount,
        pieData,
      },
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "Error in the Server.",
    });
  }
}
