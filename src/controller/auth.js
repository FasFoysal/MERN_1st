require("dotenv").config();
const jwt = require("jsonwebtoken");
const uData = require("./../../db/userData");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const verify = jwt.verify(token, process.env.jwt);
      const data = await uData.findOne({ _id: verify });
      if (data) {
        req.data = data;
        req._id = data._id;
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = auth;
