const { resolveSoa } = require("dns");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();
const UserModel = mongoose.model("users");
const conn = require('../database/db');
const qs = require('querystring');

router.get("/", (req, res) => {
    res.send("Welcome to the Server");
});

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname.replace('controllers', "/register/register.html")));
})

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname.replace('controllers', "/login/login.html")))
});

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

router.post("/verifyUser", (req, res) => {
    UserModel.findOne({ username: req.body.username, password: req.body.password }, (err, docs) => {
        if (err) {
            console.log("Error");
        }
        else {
            // console.log("Docs in Verify User" + docs);
            if (docs != null) {
                // res.sendStatus(200);
                res.redirect("/welcomePage");
            }
            else {
                res.send("Invalid User").status(300);
            }
        }
    });
});

router.get("/welcomePage", (req, res) => {
    res.sendFile(path.join(__dirname.replace('controllers', "/login/login.html")));
    res.status(200).send("Login Successfull");
});


router.post("/registerUser", (req, res) => {
    console.log("Body Username ", req.body.username);

    UserModel.create(
        {
            username: req.body.username,
            password: req.body.password,
            image_url: req.body.data,
        }).then(() => {
            // res.send("User Added Successfully");
            console.log("User Created Successfully");
        }).catch((err) => {
            // res.send("Unable to Add");
            console.log("Unable to create User", err);
        });

    res.send("Add User Called");
});


module.exports = router;