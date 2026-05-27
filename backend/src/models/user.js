const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'O nome é obrigatório'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'O e-mail é obrigatório'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'A senha é obrigatória'],
      minlength: 6
    },
    role: {
      type: String,
      enum: ['student', 'teacher'],
      default: 'student'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
