const connection = require("./database/db");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./controllers/route");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('register'));
app.use("/", routes);

app.listen(5000, () => {
    console.log("Server Started");
});