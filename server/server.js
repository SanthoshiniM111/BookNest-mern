const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const booksRoutes = require('./routes/booksRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config(); // Load .env file

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use('/api/books', booksRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Sample Route
app.get('/', (req, res) => {
  res.send('📚 Bookstore backend is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
