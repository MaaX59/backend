const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    String,
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: {
      values: [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please select correct category",
    },
  },
  seller: {
    type:Schema.Types.ObjectId,
    ref:"User"
    // required: [true, "Please enter product seller"],
  },
  sellerAvatar: {
     type:String,
  },
  stock: {
    type: Number,
    default: 1,
    required: [true, "Please enter product stock"],
    maxLength: [200, "Product stock cannot exceed 200"],
  },
  sold:{
     Number,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  review: [
    {
      name: {
        type: String,
        // required: true,
      },
      rating: {
        type: String,
        // required: true,
      },
      comment: {
        type: String,
        // required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
