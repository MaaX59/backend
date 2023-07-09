const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middlewares/jwt.auth");




// router.post(
//   "/:userId/wishlist/:productId",
//   isAuthenticated,
//   async (req, res) => {
//     console.log("Payload", req.payload);
//     const { _id } = req.payload;
//     if (req.payload ) {
//    
//      res.send("Authenticated user to add products to the wishlist");
//     res.redirect('favourites')
//     } else {
//       res.status(401).json({ error: "Unauthorized access" });
//     }

//     try {
//       const { userId, productId } = req.params;

//       const user = await User.findById(userId);
//       if (!user) {
//         return res.send("User not found");
//       }
//       const product = await Product.findById(productId);

//       if (!product) {
//         return res.send("Product not found");
//       }

//       user.wishlist = user.wishlist || [];
//       const isFavourite = user.wishlist.includes(productId);
//       if (user.wishlist && isFavourite) {
//         return res.send("Product already in favourites");
//       }
//       user.wishlist.push(productId);
//       await user.save();

//       res.send("Product added to favourites");
//     } catch (error) {
//       console.log("Error adding product to favourites:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// router.post("/:userId/wishlist/:productId", isAuthenticated, async (req, res) => {
//   try {
//     console.log("Payload", req.payload);
//     const { _id } = req.payload;

//     if (req.payload) {
//       const { userId, productId } = req.params;

//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }

//       const product = await Product.findById(productId);
//       if (!product) {
//         return res.status(404).json({ error: "Product not found" });
//       }


//       const isFavourite = user.wishlist.includes(productId);
//       if (isFavourite) {
//         return res.status(400).json({ error: "Product already in favourites" });
//       }

//       // Add the product to the wishlist
//       user.wishlist.push(productId);
//       await user.save();

//       return res.status(200).json({ message: "Product added to favourites" });
//     } else {
//       // User is not authenticated, return an unauthorized error
//       return res.status(401).json({ error: "Unauthorized access" });
//     }
//   } catch (error) {
//     console.log("Error adding product to favourites:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });



// router.get("/:userId/", isAuthenticated, async (req, res) => {

//   console.log("Payload", req.payload);
//   const { _id } = req.payload;
//   if (req.payload) {
//     res.send("Authenticated user to get products in wish list");
//   }

//   try {
//     const { userId } = req.params;

//     // Find the user by ID
//     const user = await User.findById(userId).populate("wishlist");

//     if (!user) {
//       return res.send("User not found");
//     }

//     const favouriteProducts = user.wishlist;
//     res.send(`My wishList products: ${favouriteProducts}`);
//   } catch (error) {
//     console.log("Error retrieving user favourites", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.delete("/:userId/wishlist/:productId",isAuthenticated, async (req, res) => {
//   console.log("Payload", req.payload);
//   const { _id } = req.payload;
//   if (req.payload) {
//     res.send("Authenticated user to delete products in wish list");
//   }
//   try {
//     const { userId, productId } = req.params;

//     // Find the user by ID
//     const user = await User.findById(userId).populate("wishlist");

//     if (!user) {
//       return res.send("User not found");
//     }

//     // Find the index of the product in the wishlist array
//     const productIndex = user.wishlist.findIndex(
//       (product) => product._id.toString() === productId
//     );

//     if (productIndex === -1) {
//       return res.send("Product not found in the wishlist");
//     }

//     // Remove the product from the wishlist
//     user.wishlist.splice(productIndex, 1);

//     // Save the updated user
//     await user.save();

//     res.send("Product removed from the wishlist");
//   } catch (error) {
//     console.log("Error removing product from wishlist", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// isAuthenticated,

//add to wish list
router.post("/:userId/addWishlist/:productId" ,   async (req, res) => {
  
  try {
          const { userId, productId } = req.params;
          console.log("backend wishlist", userId)
    
          const user = await User.findById(userId);
          if (!user) {
            return res.send("User not found");
          }
          const product = await Product.findById(productId);
    
          if (!product) {
            return res.send("Product not found");
          }
    
          user.wishlist = user.wishlist || [];
          const isFavourite = user.wishlist.includes(productId);
          if (user.wishlist && isFavourite) {
            return res.send("Product already in favourites");
          }
          user.wishlist.push(productId);
          await user.save();
    
          res.send("Product added to favourites");
        } catch (error) {
          console.log("Error adding product to favourites:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      });


      
      

router.get("/:userId", isAuthenticated, async (req, res) => {

 try {
    const { userId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return res.send("User not found");
    }

    const favouriteProducts = user.wishlist;
    res.send(`My wishList products: ${favouriteProducts}`);
  } catch (error) {
    console.log("Error retrieving user favourites", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//isAuthenticated,
router.delete("/:userId/removeWishlist/:productId", async (req, res) => {
  
  try {
    const { userId, productId } = req.params;

    // Find the user by ID
    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return res.send("User not found");
    }

    // Find the index of the product in the wishlist array
    const productIndex = user.wishlist.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.send("No products in the wishlist");
    }

    // Remove the product from the wishlist
    user.wishlist.splice(productIndex, 1);

    // Save the updated user
    await user.save();

    res.send("Product removed from the wishlist");
  } catch (error) {
    console.log("Error removing product from wishlist", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
