const ErrorHandler = require("../utils/ErrorHandler");

const errorHandlingFunction = (app) => {
  app.use((req, res, next) => {
    // This middleware runs whenever the requested page is not available
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    // Whenever you call next(err), this middleware will handle the error
    // Always logs the error
    console.error("ERROR", req.method, req.path, err);

    // Only render if the error occurred before sending the response
    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console",
      });
    }

    if (process.env.NODE_ENV === "development") {
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack,
        error: err,
      });
    }

    if (process.env.NODE_ENV === "production") {
      let error = new ErrorHandler(err.message, err.statusCode || 500);

      if (err.name === "ValidationError") {
        const message = `Validation Error ${err.path}`;
        error = new ErrorHandler(message, 404);
        
      }

      if (err.name === "CastError") {
        const message = `Resource not found with this id... Invalid ${err.path}`;
        error = new ErrorHandler(message, 404);
        
      }

      if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        error = new ErrorHandler(message, 400);
       
      }

      if (err.name === "JsonWebTokenError") {
        const message = "Your URL is invalid. Please try again later.";
        error = new ErrorHandler(message, 400);
        
      }

      if (err.name === "TokenExpiredError") {
        const message = "Your URL has expired. Please try again later.";
        error = new ErrorHandler(message, 400);
       
      }

      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
  });
};

module.exports = { errorHandlingFunction };
