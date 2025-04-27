export const ErrorMiddleware = (error, req, res, next) => {
  console.error(error.message);

  if (error.statusCode) {
    return res.status(error.statusCode).json({
      message: error.message,
      statusCode: error.statusCode,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    statusCode: 500,
  });
};
