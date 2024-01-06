let mongoose = require("mongoose");
let jason = require("../../pages/assets/json/constant.json");

let SmsSchema = new mongoose.Schema(
  {
    originator: {
      type: String,
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
    // status: {
    //   type: String,
    //   enum: ["disregard", "solved", "unsolved", "dismissed", "processed"],
    // },
  },
  { timestamps: true }
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
