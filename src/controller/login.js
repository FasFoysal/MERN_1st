require("dotenv").config();
const uData = require("./../../db/userData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { user, pass } = req.body;
    if (user && pass) {
      const findUser = await uData.find({
        $or: [{ uName: user }, { email: user }],
      });
      // hash pass check
      if (findUser.length) {
        await bcrypt.compare(pass, findUser[0].pass, (err, result) => {
          if (result) {
            const token = jwt.sign(findUser[0]._id.toString(), process.env.jwt);
            res.cookie("jwt", token);
            res.status(200).send({ mgs: "login successful" });
          } else {
            res.status(500).send({ mgs: "password not match" });
          }
        });
      } else {
        res.status(500).send({ mgs: "user not found plz ragister" });
      }
    } else {
      res.status(500).send({ mgs: "fill the from properly" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = login;
