const { errors } = require("../../errors");
const errorHandler = (err, req, res, next) => {
const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case errors.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: "validation error",
        stackTrace: err.stack,
      });
      break;
    case errors.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: "user does not exist",
        stackTrace: err.stack,
      });
    case errors.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: "unauthorized",
        stackTrace: err.stack,
      });
    case errors.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: "forbidden",
        stackTrace: err.stack,
      });
    case errors.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: "server error",
        stackTrace: err.stack,
      });
    default:
      console.log("No Error, All good !");
      break;
  }
 };

module.exports = errorHandler;