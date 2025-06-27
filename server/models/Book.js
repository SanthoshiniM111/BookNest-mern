const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  genre: String,
  price: Number,
  image: String,
  inStock: { type: Boolean, default: true },

  // ✅ Link book to seller
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
