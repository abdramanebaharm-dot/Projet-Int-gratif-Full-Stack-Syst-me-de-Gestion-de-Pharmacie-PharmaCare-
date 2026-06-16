function errorHandler(err, _req, res, _next) {
  console.error(err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Erreur interne du serveur';

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = { errorHandler };
