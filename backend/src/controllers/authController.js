const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Nome, e-mail e senha são obrigatórios'
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'E-mail já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === 'teacher' ? 'teacher' : 'student';

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole
    });

    const token = signToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'E-mail e senha são obrigatórios'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = signToken(user);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res) => {
  res.status(200).json({ user: req.user });
};

module.exports = { register, login, me };
