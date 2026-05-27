const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'O título é obrigatório'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'O conteúdo é obrigatório'],
      trim: true
    },
    author: {
      type: String,
      required: [true, 'O autor é obrigatório'],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', PostSchema);