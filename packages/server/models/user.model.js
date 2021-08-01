const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default:
      "https://res.cloudinary.com/tanphat171/image/upload/v1598842332/instagram/iconfinder_unknown_403017_fh5seh.png",
  },
  followers: [{ type: ObjectId, ref: "User" }],
  followings: [{ type: ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema, "users");
