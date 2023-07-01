const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const User = require("../models/User.model");

router.post("/newproduct", async (req, res) => {
  console.log(req.body);
  try {
    const createNewProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      images: req.body.images,
      category: req.body.category,
      stock: req.body.stock,
      seller: req.body.seller,
    });
    console.log("Successful creation of new product", createNewProduct);
  } catch (error) {
    console.log("error while reating product on the backend", error);
  }
});


router.get("/allproducts", async (req,res) => {
    try {
        const productsFromDb = await Product.find();
        // console.log("product from db",productsFromDb);
        res.send({productsFromDb});
        
    } catch (error) {
        console.log("getting all the products failed", error)
        
    }
});

module.exports = router;
