const express = require('express');
const Order = require('../models/Order');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/orders → Place order
router.post('/', authMiddleware, async (req, res) => {
  const { items } = req.body;

  try {
    const order = new Order({
      userId: req.user.id,
      items
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.bookId'); // ✅ Populate book details

    console.log("📦 User Orders with populated book info:", JSON.stringify(orders, null, 2));
    res.json(orders);
  } catch (err) {
    console.error("❌ Failed to fetch user orders:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET /api/orders/seller-orders → Get orders for seller's books
// ✅ GET /api/orders/seller-orders → Get orders for seller's books
// ✅ GET /api/orders/seller-orders → Group orders for seller's books by bookId
router.get('/seller-orders', authMiddleware, async (req, res) => {
  try {
    const sellerBooks = await Book.find({ seller: req.user.id }).select('_id');

    const sellerBookIds = sellerBooks.map(book => book._id);
    console.log("📘 Seller's Book IDs:", sellerBookIds);

    const orders = await Order.aggregate([
      { $unwind: '$items' },
      { $match: { 'items.bookId': { $in: sellerBookIds } } },
      {
        $group: {
          _id: '$items.bookId',
          totalOrders: { $sum: '$items.quantity' }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      { $unwind: '$bookDetails' },
      {
        $project: {
          _id: 0,
          bookId: '$bookDetails._id',
          title: '$bookDetails.title',
          author: '$bookDetails.author',
          price: '$bookDetails.price',
          totalOrders: 1
        }
      }
    ]);

    console.log("🛒 Seller Orders:", orders);
    res.json(orders);
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
