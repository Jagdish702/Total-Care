const errorHandler = (err, req, res, next) => {
  console.error('[Error]', err.message, err.stack ? `\n${err.stack}` : '');

  // Prisma known-request errors
  if (err.code === 'P2025') {
    return res.status(404).json({ success: false, message: 'Resource not found.' });
  }
  if (err.code === 'P2002') {
    return res.status(409).json({ success: false, message: 'A resource with this identifier already exists.' });
  }
  if (err.code === 'P2003') {
    return res.status(400).json({ success: false, message: 'Related resource not found.' });
  }

  // Validation errors (express-validator)
  if (err.type === 'validation') {
    return res.status(422).json({ success: false, message: 'Validation failed.', errors: err.errors });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'Invalid token.' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Token expired.' });
  }

  const status = err.statusCode || err.status || 500;
  res.status(status).json({
    success: false,
    message: status === 500 ? 'Internal server error.' : err.message,
  });
};

module.exports = errorHandler;
