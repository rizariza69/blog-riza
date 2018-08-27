require('dotenv').config()
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const tokenjwt = process.env.JWT_TOKEN
module.exports = {
 register: (req, res) => {
  const { username, email, password } = req.body;

  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);

  User
  .create({
   username,
   email,
   password: hash
  })
   .then(user => {
    const token = jwt.sign(
     { id: user._id, role: user.role },
     tokenjwt
    );
    res.status(201).json({
     msg: "success",
     user,
     token
    });
   })
   .catch(err => res.status(500).json({ msg: err }));
 },
 login: (req, res) => {
  const { email, password } = req.body;

  User
  .findOne({ email: email })
   .then(user => {
    let isTrue = bcrypt.compareSync(password, user.password);
    if (isTrue) {
     let token = jwt.sign(
      { id: user._id, email: user.email },
      tokenjwt
     );
     res.status(201).json({
      msg: "success to login",
      token,
     });
    } else {
     res.status(400).json({
      mgs: "failed to login"
     });
    }
   })
   .catch(err => {
    res.status(400).json({
     msg: "check name and password"
    });
   });
 }


};