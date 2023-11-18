let mongoose = require("mongoose");

let SettlementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["processed", "settled", "unsettled", "disregard"],
    },
    description: {
      type: String,
      default: "",
    },
  },
  { _id: 0, timestamps: true }
);

let ResponseSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    responded: {
      type: Boolean,
    },
  },
  { timestamps: false, _id: 0 }
);

let ComplaintSchema = new mongoose.Schema(
  {
    smsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sms",
    },
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
    },
    settlement: [SettlementSchema],
    inchargeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    keywords: {
      type: Array,
    },
    respondent: ResponseSchema,
    amicSettlement: {
      type: Number,
      //   increased per settlement
    },
  },
  { timestamps: true }
);

export default mongoose.models.Complaint ||
  mongoose.model("Complaint", ComplaintSchema);
