const connection = require("./database/db");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const routes = require("./controllers/route");

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('register'));
app.use(express.static('login'));
app.use("/", routes);

app.listen(5000, () => {
    console.log("Server Started");
});