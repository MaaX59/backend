const User = require("../models/User.model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.auth");
const fileUploader = require("../config/cloudinary.config");

<<<<<<< HEAD
router.post("/signup",fileUploader.single("avatar"), async (req, res) => {
=======

// const { upload } = require("../multer");
// const ErrorHandler = require("../utils/ErrorHandler");
// const path = require("path");

router.post("/signup", async (req, res) => {
>>>>>>> cb5fb519bd710edb4eb5069868e4ea71c1e6f2df
  console.log("signup req.body", req.body);
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already exists,Please Login!" });
    }
    const img= req.body.avatar;
    console.log("img file",img)

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedpassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedpassword,
      avatar: [req.file.path],
      wishlist: null,
      shoppingCart:null,
    });
    await newUser.save();
    const { _id, email, avatar, name } = newUser;
    const payload = { _id, email, avatar, name };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    console.log("New token", authToken);
    res.status(200).json({ authToken, payload});
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
        const { _id, email, avatar, name } = foundUser;
        const payload = { _id, email, avatar, name };
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

router.get("/getuser/:userId", async (req, res)=>{
  // console.log("step 2 email from reqbody",req.body)
  try {
    const { userId } = req.params;
    const foundUser = await User.findById(userId)
    // console.log("step 3 found user from db", foundUser)
    res.status(200).json({foundUser});
  } catch(error){
    console.log("error getting user for productlist", error)
  }}
)

router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, email , password, imageUrl} = req.body;
  console.log("req body", req.body);
  try {
    const user = await User.findByIdAndUpdate(userId);
    
   if (!user) {
      return res.status(404).send("User not found");
    }
    if (password && password !== user.password) {
      const passwordMatch = bcrypt.compareSync(password, user.password);
      console.log("updated name", name)

      if (!passwordMatch) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        user.password = hashedPassword;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, imageUrl },
      { new: true }
    );
    // console.log("newuser details", name)

    res.send(updatedUser);
    console.log("Updated new User", updatedUser)
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
    res.status(200).json({ user: req.payload});
  }
});

module.exports = router
