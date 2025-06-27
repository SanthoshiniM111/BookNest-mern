const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: String,
  address: String,
  phone: String,
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      quantity: { type: Number, default: 1 }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema);
