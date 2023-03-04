var uData = require("../../db/userData");

const ragister = async (req, res, next) => {
  try {
    const { uName, fName, work, email, pass, repass } = req.body;
    if (uName && fName && work && email && pass && repass) {
      if (pass === repass) {
        const getData = req.body;
        const data = new uData(getData);
        await data.save();
        console.log(req.body);
        res.status(201).send({ mgs: "Ragistration successfull" });
      } else {
        res.status(400).send({ mgs: "Password not match" });
        
      }
    } else {
      res.status(400).send({ mgs: "fill the from properly" });
      
    }
  } catch (error) {
    if (
      error.message.slice(0, 68) ==
      "mern validation failed: uName: Error, expected `uName` to be unique."
    ) {
      res.status(400).send({ mgs: "User name is alrady taken plz login" });
      
    } else if (
      error.message ==
      "mern validation failed: uName: Path `uName` is required."
    ) {
      res.status(400).send({ mgs: "user name required" });
      
    } else if (
      error.message == "mern validation failed: work: Path `work` is required."
    ) {
      res.status(400).send({ mgs: "plz fill the work field" });
      
    } else if (
      error.message == "mern validation failed: email: error is not defined"
    ) {
      res.status(400).send({mgs:"Email is not valid"});
      
    } else if (
      error.message ==
      "mern validation failed: email: Email name must be provide"
    ) {
      res.status(400).send({ mgs: "Email must required" });
      
    } else if (
      error.message.slice(0, 68) ==
      "mern validation failed: email: Error, expected `email` to be unique."
    ) {
      res.status(400).send({ mgs: "Email is already taken plz login" });
      
    } else if (error.message.slice(0, 28) == "mern validation failed: pass") {
      res.status(400).send({ mgs: "Password must be 4 latter" });
      
    } else {
      res.json(error);
      
    }
  }
};

module.exports = ragister;
