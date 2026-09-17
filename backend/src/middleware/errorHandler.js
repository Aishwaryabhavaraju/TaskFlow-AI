const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid format for field: ${err.path}`,
    });
  }

  if (
    err.name === "BSONError" ||
    (err.message && err.message.includes("BSONError")) ||
    (err.message && err.message.includes("Argument passed in must be a string of 12 bytes"))
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;