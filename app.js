// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
const ErrorHandler = require("./utils/ErrorHandler");

app.use("/api", indexRoutes);

const userRoutes = require("./routes/user.routes")
app.use("/user", userRoutes);


const wishListRoutes = require('./routes/wishlist.routes')
app.use('/wishlist', wishListRoutes)

const cartRoutes = require('./routes/cart.routes')
app.use('/cart', cartRoutes)

const productRoutes = require('./routes/product.routes')
app.use('/product', productRoutes)



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
const { errorHandlingFunction } = require("./middlewares/error");
// ...
errorHandlingFunction(app);




app.use(ErrorHandler)

module.exports = app;
