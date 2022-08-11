const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();
const UserModel = mongoose.model("users");
const conn = require('../database/db');
router.get("/", (req, res) => {
    res.send("Welcome to the Server");
});



router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname.replace('controllers', "/register/register.html")));
})

router.get("/getImageLink/:username", (req, res) => {
    UserModel.findOne({ username: req.params.username }, (err, docs) => {
        if (err) {
            res.send("Error getting Image Link");
        }
        else {
            res.send(docs["image_url"]);
        }
    });
});

router.get("/addUser/:username/:password", (req, res) => {

    UserModel.create(
        {
            username: req.params.username,
            password: req.params.password,
            image_url: `https://firebasestorage.googleapis.com/v0/b/face-recog-e3890.appspot.com/o/${req.params.username}?alt=media`,
        }, (err) => {
            if (err) {
                res.send("Unable to Create")
            }
            else {
                res.send("User Added Successfully");
            }
        }
    );
});
module.exports = router;