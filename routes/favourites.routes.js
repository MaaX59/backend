const express = require('express');
const router = express.Router();
const Product = require("../models/product.model");
const User = require("../models/User.model");

router.post("/:userId/wishlist/:productId", async (req,res) => {
    try {
       
    const { userId, productId } = req.params;
    
        const user = await User.findById(userId);
        if (!user) {
            return res.send("User not found");
          }
          const product = await Product.findById(productId);

          if (!product) {
            return res.send( 'Product not found' );
          }
        //   const isFavourite = user.wishlist.includes(productId);
        //   if (user.wishlist && isFavourite) {
        //     return res.send('Product already in favourites');
        //   }
          user.wishlist.push(productId);
          await user.save();
      
          res.send( 'Product added to favourites' );
        
    } catch (error) {
        console.log("Error adding product to favourites:", error)
        
    }
});

router.get('/:userId/wishlist', async (req, res) => {
    try {
        const { userId } = req.params;
  
      // Find the user by ID
      const user = await User.findById(userId).populate('wishlist');
  
      if (!user) {
        return res.send('User not found');
      }
  
      const favouriteProducts = user.wishlist; 
      res.send(`My wishList products: ${favouriteProducts}`);
    } catch (error) {
      console.log('Error retrieving user favourites', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.delete('/:userId/wishlist/:productId', async (req, res) => {
    try {
      const { userId, productId } = req.params;
  
      // Find the user by ID
      const user = await User.findById(userId).populate('wishlist');
  
      if (!user) {
        return res.send('User not found');
      }
  
      // Find the index of the product in the wishlist array
      const productIndex = user.wishlist.findIndex((product) => product._id.toString() === productId);
  
      if (productIndex === -1) {
        return res.send('Product not found in the wishlist');
      }
  
      // Remove the product from the wishlist
      user.wishlist.splice(productIndex, 1);
  
      // Save the updated user
      await user.save();
  
      res.send('Product removed from the wishlist');
    } catch (error) {
      console.log('Error removing product from wishlist', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;