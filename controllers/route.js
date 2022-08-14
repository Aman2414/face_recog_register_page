const { resolveSoa } = require("dns");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();
const UserModel = mongoose.model("users");
const conn = require('../database/db');
const fetch = require('node-fetch');
const axios = require('axios');

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
            if (docs != null) {
                let image = docs["image_url"];
                let testImage = req.body.img;
                console.log("Calling Authenticate");

                const data = {
                    "image": image,
                    "testImage": testImage,
                };

                //change this to heroku address
                axios.post("https://face-recog-python-api.herokuapp.com/authenticate", data).then((response) => {
                    console.log(response.data);
                    if (response.data['result'] == true)
                    {
                        res.redirect("/welcomePage");
                    }
                    else{
                        res.send("Face Did not Match");
                    }

                }).catch((err) => {
                    res.send("Error" + err);
                });
            }
            else {
                res.send("Invalid User").status(300);
            }
        }
    });
});

router.get("/welcomePage", (req, res) => {
    res.send("Login Successfull");
});


router.post("/registerUser", (req, res) => {
    console.log("Body ", req.body);

    UserModel.create(
        {
            username: req.body.username,
            password: req.body.password,
            image_url: req.body.imgData,
        }).then(() => {
            res.redirect("/login");
        }).catch((err) => {
            res.send("Unable to create User", err);
        });

});


module.exports = router;