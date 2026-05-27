const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3001')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API do Tech Challenge rodando com sucesso'
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);

/**
 * Raiz REST: navegar para /api sozinho não listava recurso específico.
 * Retorna apontamentos úteis (Swagger é o lugar natural para explorar rotas).
 */
app.get('/api', (req, res) => {
  const origin = `${req.protocol}://${req.get('host')}`;
  res.status(200).json({
    message: 'PAIF API REST',
    swagger: `${origin}/api-docs`,
    health: `${origin}/`,
    resources: {
      posts: `${origin}/api/posts`,
      searchPosts: `${origin}/api/posts/search?q=`,
      login: `${origin}/api/auth/login`
    }
  });
});

app.use('/api', postRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;