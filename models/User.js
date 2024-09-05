const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_tag: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  image_key: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
