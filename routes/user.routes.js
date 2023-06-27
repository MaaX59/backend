const router = require("express").Router();
const UserModel = require("../models/User.model");

router.post("/signup", async ( req,res)=>{
    try{
        console.log(req.body)
        const newUser = await UserModel.create(req.body);

    }catch(err){
        console.log(err)
    }
})



module.exports = router;