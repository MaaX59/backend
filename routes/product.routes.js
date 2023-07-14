const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/jwt.auth")

const fileUploader = require("../config/cloudinary.config");

router.post("/newproduct", fileUploader.single("imageUrl"), async (req, res, next) => {
  console.log("file is: ", req.file);
 
  
  try {
    console.log(req.body.seller);
    // const seller = await User.findById(req.body.seller);
    const createNewProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      seller: req.body.seller,
      images: [req.file.path],
    });
   
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log("error while creating product on the backend", error);
    res.status(500).json({ error: "Internal server error" });
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

//get Single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
    }
    res.send({ product });
  } catch (error) {
    console.log("Error retrieving product:", error);
  }
});
//update products
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
    }

    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    product.images = req.body.images;
    product.category = req.body.category;
    product.stock = req.body.stock;
    product.seller = req.body.seller;

    await product.save();
    res.send({ product });
  } catch (error) {
    console.log("Error updating product:", error);
  }
});

//delete products
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
    }

    await product.deleteOne();

    res.status(200).send("Product deleted");
  } catch (error) {
    console.log("Error deleting product:", error);
  }
});


module.exports = router;
