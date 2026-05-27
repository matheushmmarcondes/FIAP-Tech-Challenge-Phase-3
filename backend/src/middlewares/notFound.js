const notFound = (req, res, next) => {
  res.status(404).json({
    message: `Rota não encontrada: ${req.originalUrl}`
  });
};

module.exports = notFound;