const mongoose = require("mongoose");

console.log("Admin model called");

var AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

mongoose.model("admins", AdminSchema);