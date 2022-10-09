const mongoose = require("mongoose");

console.log("User model called");

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  voted: {
    type: String,
    required: true,
  },
});

mongoose.model("users", UserSchema);
