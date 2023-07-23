const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const User = require('../models/User.model');
const Order = require ('../models/order.model')
const { isAuthenticated } = require('../middlewares/jwt.auth');



router.put('/:userId/shippinginfo', async (req,res) => {
  const user = req.params;
  const shippingInfo = req.body;

  try {
   
    const updateOrder = await Order.updateOne({buyer:user.userId}, {shippingInfo}, {new:true})
    
    res.status(201).json({ message: "Order created successfully" });
  } catch (error) { console.log("error while upating model",error )
    
  }
} )
router.post('/:userId/shoppingcart', async (req,res) => {
  const cartToDb = req.body;
  const {userId} = req.params;
  console.log(cartToDb)


  try { 
   const newOrder= await Order.create({
      shippingInfo:{
        name: null,
        address:null,
        country: null,
        city:null,
        phoneNo:null,
        postalCode:null,
      },
      buyer:userId,
      orderItems: cartToDb,

    });
    res.status(201).json({ message: "Order created successfully" });


  } catch (error){
console.log("error on creating order model", error)
  }

})



//isAuthanticated,
router.put('/:userId/cart/:productId/:amount', async (req, res) => {
  try {
    const { productId, amount, userId } = req.params;
    
    //const userId = req.payload._id;
    console.log("req body", req.body)
    



    const user = await User.findById(userId);
    if (!user) {
      return res.send('User not found');
    }
    //console.log(user)

    const product = await Product.findById(productId);
    if (!product) {
      return res.send('Product not found');
    }

    // const isProductInCart = user.cart.includes(productId);
    // if (isProductInCart) {
    //   return res.send('Product already in cart');
    // }
    //const productAndAmount = product.push({amountOfItems:amount})
   
    
    user.shoppingCart = user.shoppingCart || [];
        const isInCart = user.shoppingCart.includes(productId);
        if (user.shoppingCart && isInCart) {
          return res.send("Product already in favourites");
        }

    user.shoppingCart.push(req.body);
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
  
  
  // Remove product from shopping cart isAuthenticated,
  router.delete('/:userId/cart/:productId',  async (req, res) => {
    try {
      const { userId, productId } = req.params;
      console.log("backend delete", req.params)

      await User.updateOne({_id:userId},{$pull:{"shoppingCart":{_id:productId}}},{new:true})
      //console.log("Your New Wishlist",newWishlist)
     const updatedUser = await User.findById(userId)
     console.log("This is your updated user",updatedUser)
     res.status(200).json({updatedUser})
  
      // const user = await User.findById(userId);
      // if (!user) {
      //   return res.send('User not found');
      // }
  
      // const productIndex = user.shoppingCart.findIndex((product) => product.toString() === productId);
      // if (productIndex === -1) {
      //   return res.send('Product not found in cart');
      // }
  
      // user.shoppingCart.splice(productIndex, 1);
      // await user.save();
  
      // res.send('Product removed from cart');
    } catch (error) {
      console.log('Error removing product from cart:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  module.exports = router;