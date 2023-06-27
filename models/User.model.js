const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema({
  name:{
    type: String,
    required: [true, "Please enter your name!"],
},
  email:{
    type: String,
    required: [true, "Please enter your email!"],
  },
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
  },
  avatar:{
    type: String,
    required: false,
 },
})

 const User = model("User", userSchema);

 module.exports = User;