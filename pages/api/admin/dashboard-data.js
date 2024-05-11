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

    let graphData2 = await Complaint.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $year: "$createdAt" }, { $year: "$$NOW" }],
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            type: "$type",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id.month", 1] }, then: "January" },
                { case: { $eq: ["$_id.month", 2] }, then: "February" },
                { case: { $eq: ["$_id.month", 3] }, then: "March" },
                { case: { $eq: ["$_id.month", 4] }, then: "April" },
                { case: { $eq: ["$_id.month", 5] }, then: "May" },
                { case: { $eq: ["$_id.month", 6] }, then: "June" },
                { case: { $eq: ["$_id.month", 7] }, then: "July" },
                { case: { $eq: ["$_id.month", 8] }, then: "August" },
                { case: { $eq: ["$_id.month", 9] }, then: "September" },
                { case: { $eq: ["$_id.month", 10] }, then: "October" },
                { case: { $eq: ["$_id.month", 11] }, then: "November" },
                { case: { $eq: ["$_id.month", 12] }, then: "December" },
              ],
            },
          },
          type: "$_id.type",
          count: 1,
        },
      },
      {
        $group: {
          _id: "$type",
          data: {
            $push: {
              month: "$month",
              count: "$count",
            },
          },
        },
      },
    ])
      .then((result) => {
        const monthIndex = {
          January: 0,
          February: 1,
          March: 2,
          April: 3,
          May: 4,
          June: 5,
          July: 6,
          August: 7,
          September: 8,
          October: 9,
          November: 10,
          December: 11,
        };

        const chartData = result.map((item) => {
          const statusData = {
            label: item._id,
            data: Array(12).fill(0),
          };

          item.data.forEach((monthCount) => {
            const monthIndexNumber = monthIndex[monthCount.month];
            statusData.data[monthIndexNumber] = monthCount.count;
          });

          return statusData;
        });

        return chartData;
      })
      .catch((err) => {
        console.error(err);
      });

    let graphData = await Complaint.aggregate([
      {
        $match: {
          northBarangay: {
            $ne: null,
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            address: "$northBarangay",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id.month", 1] }, then: "January" },
                { case: { $eq: ["$_id.month", 2] }, then: "February" },
                { case: { $eq: ["$_id.month", 3] }, then: "March" },
                { case: { $eq: ["$_id.month", 4] }, then: "April" },
                { case: { $eq: ["$_id.month", 5] }, then: "May" },
                { case: { $eq: ["$_id.month", 6] }, then: "June" },
                { case: { $eq: ["$_id.month", 7] }, then: "July" },
                { case: { $eq: ["$_id.month", 8] }, then: "August" },
                { case: { $eq: ["$_id.month", 9] }, then: "September" },
                { case: { $eq: ["$_id.month", 10] }, then: "October" },
                { case: { $eq: ["$_id.month", 11] }, then: "November" },
                { case: { $eq: ["$_id.month", 12] }, then: "December" },
              ],
            },
          },
          address: "$_id.address",
          count: 1,
        },
      },
      {
        $group: {
          _id: "$address",
          data: {
            $push: {
              month: "$month",
              count: "$count",
            },
          },
        },
      },
    ])
      .then((result) => {
        const monthIndex = {
          January: 0,
          February: 1,
          March: 2,
          April: 3,
          May: 4,
          June: 5,
          July: 6,
          August: 7,
          September: 8,
          October: 9,
          November: 10,
          December: 11,
        };

        const chartData = result.map((item) => {
          const statusData = {
            label: item._id,
            data: Array(12).fill(0),
          };

          item.data.forEach((monthCount) => {
            const monthIndexNumber = monthIndex[monthCount.month];
            statusData.data[monthIndexNumber] = monthCount.count;
          });

          return statusData;
        });

        return chartData;
      })
      .catch((err) => {
        console.error(err);
      });

    return res.json({
      success: true,
      data: {
        smsCount,
        complainCount,
        residentsCount,
        adminCount,
        pieData,
        graphData,
        graphData2,
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
