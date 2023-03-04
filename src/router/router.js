var express = require("express");
var router = express.Router();
var ragister = require("./../controller/ragister");
var login = require("./../controller/login");
var auth = require("./../controller/auth");
var messageSend = require("./../controller/messageSend");
var logout = require('./../controller/logout')
// manu bar request
router.get("/getData", auth, (req, res) => {
  if (req.data) {
    res.status(200).send(req.data);
  } else {
    res.status(404).send({ mgs: "not found" });
  }
});

// ragister user
router.post("/ragister", ragister);

// login user
router.post("/login", login);

// login user
router.post("/messagesend", auth, messageSend);

// logout
router.get("/logout",logout)

module.exports = router;
