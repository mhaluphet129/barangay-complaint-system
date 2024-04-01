import dbConnect from "@/database/dbConnect";
import Complain from "@/database/models/complaint";
import Resident from "@/database/models/resident";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method != "GET") throw Error("Request Method is not acceptable");

  try {
    const { page, index, type, searchKey } = req.query;
    var re = new RegExp(searchKey?.trim(), "i");

    let complain = await Complain.aggregate([
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
      {
        $match: {
          $and: [
            {
              ...(type == undefined ? {} : { type }),
            },
            {
              $or: [
                { tempId: { $regex: re } },
                { tempId1: { $regex: re } },
                { "residentId.name": { $regex: re } },
                { "lastname.name": { $regex: re } },
                { fullName: { $regex: re } },
                { respondentName: { $regex: re } },
              ],
            },
          ],
        },
      },
      {
        $skip: Number.parseInt(page * index),
      },
      {
        $limit: Number.parseInt(page),
      },
    ]);

    const doc2 = await Complain.aggregate([
      {
        $lookup: {
          from: "residents",
          localField: "residentId",
          foreignField: "_id",
          as: "residentId",
        },
      },
      {
        $unwind: "$residentId",
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
      {
        $match: {
          $and: [
            {
              ...(type == undefined
                ? { $or: [{ type: "walk-in" }, { type: "web" }] }
                : { type }),
            },
            {
              $or: [
                { tempId: { $regex: re } },
                { "residentId.name": { $regex: re } },
                { "lastname.name": { $regex: re } },
                { fullName: { $regex: re } },
                { respondentName: { $regex: re } },
              ],
            },
          ],
        },
      },
    ]);

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
