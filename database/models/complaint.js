let mongoose = require("mongoose");

let SettlementSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["processed", "solved", "unsolved", "disregard", "dismissed"],
    },
    description: {
      type: String,
      default: "",
    },
  },
  { _id: 0, timestamps: true }
);

let ComplaintSchema = new mongoose.Schema(
  {
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
    },
    settlement: [SettlementSchema],
    inchargeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    respondentName: String,
    respondentNumber: String,
    // temp number from inbound sms (no resident, no respondent)
    complainerNumber: String,
    isResponded: {
      type: Boolean,
      default: "false",
    },
    amicSettlement: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      enum: ["walk-in", "web", "sms"],
      default: "walk-in",
    },
    description: String,
    images: [String],
    northBarangay: String,
    amicSettlementLastUpdate: Date,
  },
  { timestamps: true }
);

ComplaintSchema.pre("validate", function (next) {
  this.amicSettlementLastUpdate = this.createdAt;
  next();
});

export default mongoose.models.Complaint ||
  mongoose.model("Complaint", ComplaintSchema);
