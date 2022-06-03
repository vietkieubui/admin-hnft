const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    // require: true,
  },
  avatar: {
    data: Buffer,
    // require: true,
    contentType: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  darkTheme: {
    type: Boolean,
    default: false,
  },
  listFavourite: {
    type: Array,
  },
});

module.exports = mongoose.model("users", UserSchema);
