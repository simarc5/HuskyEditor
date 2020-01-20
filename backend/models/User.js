const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User schema data

const UserSchema = new Schema({
  account: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

// Exporting users model
module.exports = mongoose.model("users", UserSchema);