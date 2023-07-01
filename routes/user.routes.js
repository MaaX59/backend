const User = require("../models/User.model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {isAuthenticated} = require('../middlewares/jwt.auth');


// const { upload } = require("../multer");
// const ErrorHandler = require("../utils/ErrorHandler");
// const path = require("path");



router.post("/signup", async (req, res) => {

  //this doesn´t work, how is it suppose to send info from front to backend?
  console.log("signup req.body",req.body);
  try {

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists,Please Login!" });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedpassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedpassword,
      avatar: req.body.file,
    });
    console.log("Successful user", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
//get info from form

console.log("login req.body", req.body);
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    console.log("here is the found User", foundUser)
    if (foundUser) {
      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      console.log("Password Match", passwordMatch);
      if (passwordMatch) {
        const { _id, email } = foundUser;
        const payload = { _id, email };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        console.log("New token", authToken);
        res.status(200).json({ authToken });
      }
    } else {
      res.status(400).json({ errorMessage: "Invalid User" });
    }
  } catch(err) {
    console.log(err);
  }
});

router.get('/verify',isAuthenticated, (req,res) =>{
    console.log("Payload", req.payload)
    if(req.payload){
        res.status(200).json({user:req.payload})
    }
})

module.exports = router;
