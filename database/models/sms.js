let mongoose = require("mongoose");
let jason = require("../../pages/assets/json/constant.json");

// ! sent an sms
// * heirachy of sms creation
// * send an sms -> if success -> create model with date timestamp return by sms provider

// ! receive an sms
// * check if number exist on sms entries
// * if exist, attach on convo, otherwise create new convo

let SmsSchema = new mongoose.Schema(
  {
    originator: {
      type: String || mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    message: {
      type: String,
      required: true,
    },
    keywords: {
      type: Array,
    },
    residentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resident",
    },
    number: {
      type: String,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: false }
);

SmsSchema.pre("validate", function (next) {
  const stopWords = [...jason.english_stop_word, ...jason.tagalog_stop_word];
  const words = this.message
    .replace(/[^\w\s]/gi, "")
    .toLowerCase()
    .split(/\s+/);
  const filteredWords = words
    .filter((word) => word.trim() !== "")
    .filter((word) => !stopWords.includes(word));
  const uniqueWords = [...new Set(filteredWords)];
  this.keywords = uniqueWords;
  next();
});

export default mongoose.models.Sms || mongoose.model("Sms", SmsSchema);
