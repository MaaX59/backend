const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
  },
<<<<<<< HEAD
  avatar:[
   String,
    ],
 wishlist: [
  {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
],
shoppingCart: [
  {
    type: Object,
  },
],
 createdAt:{
  type: Date,
  default: Date.now(),
 },
})
=======
  avatar: {
    type: String,
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wishedProduct",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
>>>>>>> cb5fb519bd710edb4eb5069868e4ea71c1e6f2df

const User = model("User", userSchema);

module.exports = User;
