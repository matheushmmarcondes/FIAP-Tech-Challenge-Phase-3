require('dotenv').config();

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_jwt_secret_key';

const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
});