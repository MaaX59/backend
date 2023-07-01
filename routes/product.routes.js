const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const User = require('../models/User.model');

// const { getProducts, newProduct } = require('../controllers/productControllers');

// router.route('/allproducts').get(getProducts);
// router.route('/newproduct').post(newProduct)


router.post("/newproduct", async (req, res) => {
   console.log(req.body)
    try {
        const createNewProduct = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            images: req.body.images,
            category: req.body.category,
            stock: req.body.stock,
        });
        console.log("Successful creation of new product", createNewProduct)
        
    } catch (error) {
        console.log("error while reating product on the backend", error)
        
    }
    
})

module.exports = router;