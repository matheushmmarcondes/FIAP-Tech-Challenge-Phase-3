const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação não informado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

const teacherOnly = (req, res, next) => {
  if (req.user?.role !== 'teacher') {
    return res.status(403).json({
      message: 'Acesso restrito a docentes'
    });
  }
  next();
};

module.exports = { authMiddleware, teacherOnly };
