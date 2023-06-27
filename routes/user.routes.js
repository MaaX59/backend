const User = require("../models/User.model")
const express = require ("express");
const path = require("path");
const router = express.Router();
const {upload} = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");

router.post("/signup",async(req,res) =>{
    console.log(req.body);
    try{
        const newUser= await User.create(req.body);
        console.log("Successful user", newUser);
        res.json(newUser);
    }catch(err){
        console.log(err);
    }
})

// router.post("/create-user",  async(req,res,next) =>{
//     const {name,email,password} =req.body;
//     const userEmail = await UserActivation.findOne({email});

//     if(userEmail){
//         return next (new ErrorHandler("User already exists", 400));
//     }

//     const filename = req.file.filename;
//     const fileUrl = path.join(filename);

//     const user ={
//         name:name,
//         email:email,
//         password:password,
//         avatar:fileUrl,
//     }

//     console.log(user);

// } )

module.exports = router;