const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://aman:aman@cluster0.yiokapd.mongodb.net/face_recog?retryWrites=true&w=majority", { useNewUrlParser: true }).then(() => {
    console.log("Connected To Database in Atlas");
}).catch((e) => {
    console.log("Error");
});


const User = require("../model/user_model.js");
