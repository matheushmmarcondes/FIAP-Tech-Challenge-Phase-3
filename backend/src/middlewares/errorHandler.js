const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID inválido'
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erro de validação',
      details: Object.values(err.errors).map((error) => error.message)
    });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Erro interno do servidor'
  });
};

module.exports = errorHandler;