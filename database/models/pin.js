let mongoose = require("mongoose");

let PinSchema = new mongoose.Schema(
  {
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
    },
    pin: {
      type: Number,
      required: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    // status: {
    //   type: String,
    //   enum: ["disregard", "solved", "unsolved", "dismissed", "processed"],
    // },
  },
  { timestamps: true }
);

export default mongoose.models.Pin || mongoose.model("Pin", PinSchema);
