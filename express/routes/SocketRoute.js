const express = require("express");
const cors = require("cors");
const router = express.Router();
const Message = require("../models/message");
var bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(cors());

router.post("/", (req, res, next) => {
  Message.create({ name: req.body.name, content: req.body.content }).then(
    (data) => {
      console.log(req.body);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(data);
    },
    (err) => next(err)
  );
});
router.get("/", (req, res, next) => {
  Message.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((err, messages) => {
      if (err) return console.error(err);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      var reverseMessages = messages.reverse();
      res.json(reverseMessages);
    });
});
module.exports = router;
