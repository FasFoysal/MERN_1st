require("dotenv").config();
var mongoose = require("mongoose");
var validator = require("validator");
var uniqueValidator = require("mongoose-unique-validator");
var bcrypt = require("bcrypt");

(async function () {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.userData);
    console.log("mongo connect successfull(user data)");
  } catch (error) {
    console.log(error);
  }
})();

const allData = new mongoose.Schema({
  uName: {
    type: String,
    required: true,
    unique: [true, "User name must be provide"],
  },
  fName: {
    type: String,
    required: [true, "Full name must be provide"],
  },
  work: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email name must be provide"],
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new error("Email not valid");
      }
    },
    unique: [true, "Email is alrady taken"],
  },
  pass: {
    type: String,
    require: [true, "password must be 4 latter"],
    minLength: 4,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      number: {
        type: String,
      },
      text: {
        type: String,
      },
    },
  ],
});
// unique value error plugin
allData.plugin(uniqueValidator);
// bcrypt password save
allData.pre("save", async function (next) {
  if (this.isModified("pass")) {
    try {
      this.pass = await bcrypt.hash(this.pass, 8);
      next();
    } catch (error) {
      console.log(error);
    }
  } else {
    // console.log("out");
  }
});
// message save
allData.methods.addMessage = async function (name, email, number, text) {
  try {
    this.messages = this.messages.concat({name, email, number, text});
    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error);
  }
};

const uData = mongoose.model("mern", allData);

module.exports = uData;
