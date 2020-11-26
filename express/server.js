// 'use strict';
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const BackRouter = require("./routes/routes");
const SocketRoute = require("./routes/SocketRoute")
const router = express.Router();
const mongoose = require("mongoose")
var uri =
  "mongodb+srv://jayanth:jayanth1610120@cluster0.rdnwp.mongodb.net/chattercapp?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connedto mdb");
  });
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));
router.use("/backend", BackRouter);
router.use("/message", SocketRoute);
app.use(bodyParser.json());

app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
