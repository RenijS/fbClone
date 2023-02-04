const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    firstName: { type: String, required: true, maxLength: 32, trim: true },
    lastName: { type: String, required: true, maxLength: 32, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  { collection: "user_data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
