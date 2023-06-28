const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

const User = require("../models/User.model")
const { expressjwt: jwt } = require("express-jwt");



const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

function getTokenFromHeaders(req) {
 
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
  
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

module.exports = {
  isAuthenticated,
};


// const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
//     const { token } = req.cookies;
  
//     if (!token) {
//       return next(new ErrorHandler("Please login to continue", 401));
//     }
  
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
//     req.user = await User.findById(decoded.id);
  
//     next();
//   });




