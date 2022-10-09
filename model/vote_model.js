const mongoose = require("mongoose");

console.log("Voting model called");

var VotingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  votes: {
    type: String,
    required: true,
  },
});

mongoose.model("votes", VotingSchema);
