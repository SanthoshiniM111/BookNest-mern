const jwt = require('jsonwebtoken');
require('dotenv').config(); // make sure this line exists if not already in server.js

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, access denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract actual token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
