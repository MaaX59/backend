const User = require("../models/User.model");
const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
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
  try {
    const foundUser = await User.findOne({email: req.body.email});
    //console.log("here is the found User", foundUser)
    if (foundUser) {
        
      const passwordMatch = bcrypt.compareSync(
        req.body.password,
        foundUser.password
        
      );
      console.log("Password Match", passwordMatch);
    } else {
      res.status(400).json({ errorMessage: "Invalid User" });
    }
  } catch {
    console.log(err);
  }
});

module.exports = router;
