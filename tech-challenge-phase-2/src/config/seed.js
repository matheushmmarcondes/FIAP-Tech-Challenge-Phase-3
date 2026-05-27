const bcrypt = require('bcryptjs');
const User = require('../models/user');

const seedDefaultTeacher = async () => {
  const email = process.env.SEED_TEACHER_EMAIL || 'professor@paif.com';
  const exists = await User.findOne({ email });

  if (exists) return;

  const password = process.env.SEED_TEACHER_PASSWORD || 'professor123';
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name: 'Professor PAIF',
    email,
    password: hashedPassword,
    role: 'teacher'
  });

  console.log(`Usuário docente padrão criado: ${email}`);
};

module.exports = seedDefaultTeacher;
