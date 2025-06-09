const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};
const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: {
      statusCode: err.statusCode,
      status: err.status,
      isOperational: err.isOperational,
    },
  });
};
const sendErrorProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: {
      statusCode: err.statusCode,
      message: err.message,
    },
  });
};

export default globalErrorHandler;
