const ErrorHandler = require("../utils/ErrorHandler")

module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res
        .status(500)
        .json({
          message: "Internal server error. Check the server console",
        });
    }

    if(err.name ==="CastError"){
      const message = `Resources not found with this id... Invalid ${err.path}`;
    }

    if(err.code === 11000){
      const message =`Duplicate key ${Object.keys(err.keyValue)} Entered`;
      err= new ErrorHandler(message,400);
    }

    if(err.name === JsonWebTokenError){
      const message ="Your URL is invalid please try again later";
      err = new ErrorHandlerr(message,400);
    }

if(err.name === "TokenExpiredError"){
  const message ="Your Url is expired please try again later";
  err = new ErrorHandler(message, 400);
}

res.status(err.statusCode).json({
  success:false,
  message:err.message,
})

  });
}