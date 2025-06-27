import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // ✅ Import your dashboard styling

function YourProducts() {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/books/mine', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBooks(res.data))
    .catch(err => console.error('Failed to load products:', err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📚 Your Uploaded Books</h2>
      {books.length === 0 ? (
        <p>You haven't added any books yet.</p>
      ) : (
        <div className="products-grid">
          {books.map(book => (
            <div key={book._id} className="product-card">
              <div className="product-title">{book.title}</div>
              <div className="product-author">by {book.author}</div>
              <div className="product-price">₹{book.price}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YourProducts;

