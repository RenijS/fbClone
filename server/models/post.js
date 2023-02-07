const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: { type: String },
    likes: { type: Array, default: [] },
  },
  { collection: "post_data", timestamps: true }
);

const model = mongoose.model("PostData", Post);

module.exports = model;
