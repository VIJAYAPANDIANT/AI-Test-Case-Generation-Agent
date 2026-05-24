/**
 * Centralized error handler middleware.
 * Formats errors and logs them to the console.
 */
export function errorHandler(err, req, res, next) {
  console.error("Error details:", err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}
