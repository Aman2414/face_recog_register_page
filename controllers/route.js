const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();
const UserModel = mongoose.model("users");
const VoteModel = mongoose.model("votes");
const AdminModel = mongoose.model("admins");
const conn = require("../database/db");
const fetch = require("node-fetch");
const axios = require("axios");
let currentUser;
let admin;
router.get("/", (req, res) => {
  res.send("Welcome to the Server");
});

router.get("/totalVotes/:name", (req, res) => {
  if (admin == null) {
    res.sendStatus(403);
  } else {
    VoteModel.findOne({ name: req.params.name }, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else if (result != null) {
        let totalvotes = result["votes"];
        res.status(200).send({ votes: totalvotes });
      } else {
        res.sendStatus(404);
      }
    });
  }
});

router.get("/register", (req, res) => {
  if (admin == null) {
    res.redirect("/admin");
  } else {
    res.sendFile(
      path.join(__dirname.replace("controllers", "/register/register.html"))
    );
  }
});

router.get("/adminVoting", (req, res) => {
  if (admin == null) {
    res.redirect("/admin");
  } else {
    res.sendFile(
      path.join(
        __dirname.replace("controllers", "/adminVoting/adminVoting.html")
      )
    );
  }
});

router.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname.replace("controllers", "/login/login.html"))
  );
});

router.get("/adminPage", (req, res) => {
  if (admin != null) {
    res.sendFile(
      path.join(__dirname.replace("controllers", "/adminDash/adminDash.html"))
    );
  } else {
    res.redirect("/admin");
  }
});

router.get("/admin", (req, res) => {
  res.sendFile(
    path.join(__dirname.replace("controllers", "/admin/admin.html"))
  );
});

router.post("/verifyAdmin", (req, res) => {
  console.log("Admin Username " + req.body.username);
  console.log("Password " + req.body.password);

  AdminModel.findOne(
    { username: req.body.username, password: req.body.password },
    (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else if (result != null) {
        admin = req.body.username;
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    }
  );
  // res.sendStatus(200);
});

router.get("/getImageLink/:username", (req, res) => {
  UserModel.findOne({ username: req.params.username }, (err, docs) => {
    if (err) {
      res.send("Error getting Image Link");
    } else {
      res.send(docs["image_url"]);
    }
  });
});

router.post("/addvote/:name", (req, res) => {
  let totalVotes;
  console.log("Name:", req.params.name);
  let Name = req.params.name;
  VoteModel.findOne({ name: Name }, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else if (result == null) {
      res.sendStatus(404);
    } else {
      totalVotes = result["votes"];
      totalVotes = parseInt(totalVotes) + 1;
      console.log(`Total Votes after adding: ${totalVotes}`);
      console.log("CurrentUser", currentUser);
      VoteModel.findOneAndUpdate(
        { name: Name },
        { votes: totalVotes },
        null,
        (err, result) => {
          if (err) {
            console.log("Unable to add vote");
            res.sendStatus(502);
          } else {
            UserModel.findOneAndUpdate(
              { username: currentUser },
              { voted: "yes" },
              null,
              (err, result) => {
                if (err) {
                  res.sendStatus(500);
                } else {
                  console.log("Updated To yes");
                }
              }
            );
            res.sendStatus(200);
          }
        }
      );
    }
  });
});

router.post("/verifyCam", (req, res) => {
  UserModel.findOne({ username: currentUser }, (err, result) => {
    if (err) {
      console.log("Error so sending code 500", err);
      res.sendStatus(500);
    } else if (result != null) {
      let image = result["image_url"];
      let testImage = req.body.img;
      console.log("Authenticating");
      const data = {
        image: image,
        testImage: testImage,
      };
      axios
        .post("https://face-recog-python-api.herokuapp.com/authenticate", data)
        .then((response) => {
          console.log(response.data);
          if (response.data["result"] == true) {
            UserModel.findOne(
              { username: req.body.username, voted: "yes" },
              (err, result) => {
                if (err) {
                  res.sendStatus(500);
                } else if (result != null) {
                  res.sendStatus(403);
                } else {
                  UserModel.findOneAndUpdate(
                    { username: req.body.username },
                    { voted: "yes" },
                    (err, result) => {
                      if (err) {
                        res.sendStatus(500);
                      } else {
                        res.sendStatus(200);
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.sendStatus(404);
          }
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    } else {
      res.send();
      res.sendStatus(406);
    }
  });
});

router.get("/voting", (req, res) => {
  if (currentUser == null) {
    res.redirect("/login");
  } else {
    res.sendFile(
      path.join(__dirname.replace("controllers", "/voting/voting.html"))
    );
  }
});

router.get("/faceVerify", (req, res) => {
  if (currentUser == null) {
    console.log("No current User");
    res.redirect("/login");
  } else {
    res.sendFile(path.join(__dirname.replace("controllers", "/cam/cam.html")));
  }
});

router.get("/forgotPass", (req, res) => {
  res.send("Welcome to forgot password page");
});

router.post("/verifyLogin", (req, res) => {
  console.log("Verifying Login");

  console.log("Username: " + req.body.username);
  console.log("Password: " + req.body.password);

  UserModel.findOne(
    { username: req.body.username, password: req.body.password },
    (err, docs) => {
      if (err) {
        res.sendStatus(404);
      } else if (docs != null) {
        UserModel.findOne(
          { username: req.body.username, voted: "yes" },
          (err, result) => {
            if (err) {
              res.sendStatus(500);
            } else if (result != null) {
              res.sendStatus(406);
            } else {
              currentUser = req.body.username;
              res.sendStatus(200);
            }
          }
        );
      } else {
        res.sendStatus(403);
      }
    }
  );
});

router.post("/registerUser", (req, res) => {
  console.log("Username ", req.body.username);
  console.log("Password ", req.body.password);

  UserModel.create({
    username: req.body.username,
    password: req.body.password,
    image_url: req.body.imgData,
    voted: "no",
  })
    .then((response) => {
      console.log("Sending");
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error");
      res.send("Unable to create User");
    });
});

module.exports = router;
