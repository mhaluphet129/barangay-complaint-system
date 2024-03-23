let mongoose = require("mongoose");
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

export default mongoose.models.Sms || mongoose.model("Sms", SmsSchema);
