const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const User = require("../models/User.model");
const {isAuthenticated} = require("../middlewares/jwt.auth")

const fileUploader = require("../config/cloudinary.config");

router.post("/newproduct", fileUploader.single("imageUrl"), isAuthenticated, async (req, res, next) => {
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
      seller: req.payload._id,
      images: [req.file.path],
    });
   
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log("error while creating product on the backend", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/created', isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const userProducts = await Product.find({ seller: userId });
    console.log(userId)
    console.log("user products",userProducts)
    res.status(200).json({ products: userProducts});
  } catch (error) {
    console.log('Error while retrieving new products', error);
    res.status(500).json({ error: 'Internal server error' });
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
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const productId = req.params.id;

    // Check if the product belongs to the authenticated user
    const product = await Product.findOne({ _id: productId, seller: userId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    // Update the product fields
    product.name = req.body.name;
    product.description = req.body.description;
    product.category = req.body.category;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.images = req.body.images;

    await product.save();

    res.status(200).json({ product });
  } catch (error) {
    console.log('Error while updating product', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//delete products
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const productId = req.params.id;

    // Check if the product belongs to the authenticated user
    const product = await Product.findOne({ _id: productId, seller: userId });
    if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.log('Error while deleting product', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
