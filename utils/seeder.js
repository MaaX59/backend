const app = require("../app");
const products = require("../data/products.json");
const Product = require('../models/product.model')
require("dotenv").config();
require("../db");
require("../config")(app);

const seedProducts = async() =>{
    try{
    await Product.deleteMany();
    console.log('Products deleted!')
    await Product.insertMany(products);
    console.log('All products added!')
    }catch(err){
        console.log(err.message)
    }
    process.exit();
    
}

seedProducts();