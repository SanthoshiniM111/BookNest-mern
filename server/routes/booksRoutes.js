const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

// ✅ TEST ROUTE
router.get('/test', (req, res) => {
  res.send('✅ Book routes are working');
});

// ✅ GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET books added by the currently logged-in seller
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({ seller: req.user.id });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET single book by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new book (protected + links to seller)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newBook = new Book({
      ...req.body,
      seller: req.user.id // ✅ Link book to seller
    });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ PUT update book
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE book
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
