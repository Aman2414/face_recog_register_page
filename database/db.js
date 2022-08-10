const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/face_recog", { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("Database Connected");
    }
    else {
        console.log("Error Connecting to database");
    }
});

const User = require("../model/user_model.js");
