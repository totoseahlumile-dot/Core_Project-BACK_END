export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// Main error handler
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || 'Internal Server Error';

  // Handle MySQL specific errors
  if (err.code === 'ER_DUP_ENTRY') {
    statusCode = 409;
    message = 'Duplicate entry: ' + err.message;
  }

  if (err.code === 'ER_BAD_FIELD_ERROR') {
    statusCode = 400;
    message = 'Invalid field: ' + err.message;
  }

  if (err.code === 'ER_NO_REFERENCED_ROW') {
    statusCode = 404;
    message = 'Referenced record not found';
  }

  if (err.code === 'ER_DATA_TOO_LONG') {
    statusCode = 400;
    message = 'Data too long for field';
  }

  // Log error for debugging
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;