const Product = require('../models/product.model')
const products = require('../data/products.json');


exports.getProducts =async(req,res,next) =>{
    const product = await Product.find();
    res.status(200).json({
        success:true,
        message:"This route will show all the products in database",
        data:product
    })
}

exports.newProduct = async (req,res,next) =>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
})
}

exports.getSingleProduct = async(req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
      return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(201).json({
        success:true,
        product
    })
}

exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  };

  exports.deleteProduct = async(req,res, next) =>{
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      product.deleteOne();
      res.status(200).json({
        success:true,
        message:"Product deleted"
      })
  }
  