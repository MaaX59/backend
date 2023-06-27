const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    fullName:{
      type:String, 


    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    }, 
    avatar:{
      type:String,
      required:true,
    }
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
