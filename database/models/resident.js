let mongoose = require("mongoose");

let ResidentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    middlename: {
      type: String,
    },
    lastname: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    civilStatus: {
      type: String,
      reqruired: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Resident ||
  mongoose.model("Resident", ResidentSchema);
