const User = require("../models/User.model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.auth");

// const { upload } = require("../multer");
// const ErrorHandler = require("../utils/ErrorHandler");
// const path = require("path");

router.post("/signup", async (req, res) => {
  console.log("signup req.body", req.body);
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already exists,Please Login!" });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedpassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedpassword,
      avatar: req.body.file,
      wishlist: null,
      shoppingCart:null,
    });
    const { _id, email } = newUser;
    const payload = { _id, email };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    console.log("New token", authToken);
    res.status(200).json({ authToken });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  //get info from form

  console.log("login req.body", req.body);
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    console.log("here is the found User", foundUser);
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
      } else {
        res.status(401).json({ errorMessage: "Incorrect Password" });
      }
    } else {
      res.status(400).json({ errorMessage: "Invalid User" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/getuser", async (req, res)=>{
  console.log("step 2 email from reqbody",req.body)
  try {
    const foundUser = await User.find()
    console.log("step 3 found user from db", foundUser)
    res.send({foundUser});
  } catch(error){
    console.log("error getting user for productlist", error)
  }}
)

router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, email , password, imageUrl} = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId);
    
   if (!user) {
      return res.status(404).send("User not found");
    }
    if (password) {
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        user.password = hashedPassword;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password: user.password, imageUrl },
      { new: true }
    );

    res.send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  console.log("Payload", req.payload);
  const { _id } = req.payload;
  if (req.payload) {
    res.status(200).json({ user: req.payload });
  }
});

module.exports = router
