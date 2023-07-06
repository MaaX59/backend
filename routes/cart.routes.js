const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const User = require('../models/User.model');
const { isAuthenticated } = require('../middlewares/jwt.auth');


router.post('/:userId/cart/:productId',isAuthenticated, async (req, res) => {
    try {
      const { userId, productId } = req.params;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.send('User not found');
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.send('Product not found');
      }
  
      const isProductInCart = user.cart.includes(productId);
      if (isProductInCart) {
        return res.send('Product already in cart');
      }
  
      user.cart.push(productId);
      await user.save();

      
    console.log(`Product added to cart: ${product}`);
  
      res.send('Product added to cart');
    } catch (error) {
      console.log('Error adding product to cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get products in the shopping cart
router.get('/:userId/cart',isAuthenticated,  async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find the user by ID
      const user = await User.findById(userId).populate('cart');
  
      if (!user) {
        return res.send('User not found');
      }
  
      const cartProducts = user.cart;
      res.send(`My cart products: ${cartProducts}`);
    } catch (error) {
      console.log('Error retrieving user cart', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  // Remove product from shopping cart
  router.delete('/:userId/cart/:productId', isAuthenticated, async (req, res) => {
    try {
      const { userId, productId } = req.params;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.send('User not found');
      }
  
      const productIndex = user.cart.findIndex((product) => product.toString() === productId);
      if (productIndex === -1) {
        return res.send('Product not found in cart');
      }
  
      user.cart.splice(productIndex, 1);
      await user.save();
  
      res.send('Product removed from cart');
    } catch (error) {
      console.log('Error removing product from cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  module.exports = router;