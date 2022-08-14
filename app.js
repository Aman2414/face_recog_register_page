const connection = require("./database/db");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./controllers/route");
const port =  process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('register'));
app.use(express.static('login'));
app.use("/", routes);

app.listen(port, () => {
    console.log("Server Started");
});