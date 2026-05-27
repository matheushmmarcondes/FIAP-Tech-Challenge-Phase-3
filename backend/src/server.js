require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const seedDefaultTeacher = require('./config/seed');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  await seedDefaultTeacher();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

startServer();