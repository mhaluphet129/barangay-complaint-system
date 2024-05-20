import dbConnect from "@/database/dbConnect";
import Complain from "@/database/models/complaint";
import Resident from "@/database/models/resident";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");

  try {
    const { page, pageSize, type, searchKey } = req.query;
    var re = new RegExp(searchKey?.trim(), "i");

    const query = [
      {
        $lookup: {
          from: "residents",
          localField: "residentId",
          foreignField: "_id",
          as: "residentId",
        },
      },
      {
        $lookup: {
          from: "admins",
          localField: "inchargeId",
          foreignField: "_id",
          as: "inchargeId",
        },
      },
      {
        $lookup: {
          from: "sms",
          localField: "smsId",
          foreignField: "_id",
          as: "smsId",
        },
      },
      {
        $unwind: { path: "$residentId", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$inchargeId", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$smsId", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          tempId1: { $toString: "$_id" },
        },
      },
      {
        $addFields: {
          tempId: { $substr: ["$tempId1", 18, 24] },
        },
      },
      {
        $addFields: {
          fullName: {
            $concat: ["$residentId.name", " ", "$residentId.lastname"],
          },
        },
      },
    ];

    if (page) {
      query.push({
        $skip: (Number.parseInt(page) - 1) * Number.parseInt(pageSize),
      });
      query.push({
        $limit: Number.parseInt(pageSize),
      });
    }

    if (type != undefined || searchKey != "") {
      query.push({
        $match: {
          $and: [
            ...(type != undefined ? { type } : {}),
            ...(searchKey == ""
              ? {}
              : {
                  $or: [
                    { tempId: { $regex: re } },
                    { tempId1: { $regex: re } },
                    { "residentId.name": { $regex: re } },
                    { "lastname.name": { $regex: re } },
                    { fullName: { $regex: re } },
                    { respondentName: { $regex: re } },
                  ],
                }),
          ],
        },
      });
    }

    let complain = await Complain.aggregate(query);

    const query2 = [
      {
        $lookup: {
          from: "residents",
          localField: "residentId",
          foreignField: "_id",
          as: "residentId",
        },
      },
      {
        $unwind: { path: "$residentId", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          tempId1: { $toString: "$_id" },
        },
      },
      {
        $addFields: {
          tempId: { $substr: ["$tempId1", 18, 24] },
        },
      },
      {
        $addFields: {
          fullName: {
            $concat: ["$residentId.name", " ", "$residentId.lastname"],
          },
        },
      },
    ];

    if (type != undefined || searchKey != "") {
      query2.push({
        $match: {
          $and: [
            ...(type != undefined ? { type } : {}),
            ...(searchKey == ""
              ? {}
              : {
                  $or: [
                    { tempId: { $regex: re } },
                    { tempId1: { $regex: re } },
                    { "residentId.name": { $regex: re } },
                    { "lastname.name": { $regex: re } },
                    { fullName: { $regex: re } },
                    { respondentName: { $regex: re } },
                  ],
                }),
          ],
        },
      });
    }

    const doc2 = await Complain.aggregate(query2);

    return res.json({
      success: true,
      complain,
      total: doc2.length,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "Error in the Server.",
    });
  }
}
