let mongoose = require("mongoose");
let Complain = require("../models/complaint");
let { getKeyword } = require("../../assets/utilities/keyword_generator");

let SmsSchema = new mongoose.Schema(
  {
    originator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
    },
    message: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    keywords: Array,
    toComplain: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
      enum: ["inbound", "outbound"],
    },
  },
  { timestamps: true }
);

SmsSchema.pre("validate", function (next) {
  this.keywords = getKeyword(this.message);
  next();
});

// SmsSchema.pre(["find", "findOne", "findOneAndUpdate"], async function (next) {
//   try {
//     const complain = await Complain.findOne({ respondentNumber: this.number });
//     if (complain) {
//       this.toComplain = true;
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     this.queue = 1;
//   }
//   next();
// });

export default mongoose.models.Sms || mongoose.model("Sms", SmsSchema);
