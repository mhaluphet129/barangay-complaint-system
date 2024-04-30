let mongoose = require("mongoose");

let NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug_name: String,
    imgs: [String],
  },
  { timestamps: true }
);

export default mongoose.models.News || mongoose.model("News", NewsSchema);
