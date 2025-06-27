import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'; // ✅ Import your CSS

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBookClick = (id) => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate(`/book/${id}`);
    } else {
      alert('Please login to view book details');
      navigate('/login');
    }
  };

  return (
    <div>
      {/* 🔥 OFFER BANNER */}
      <div className="offer-banner">
        <h2>Welcome to BookNest</h2>
        <p>Books that bring the world to your doorstep!</p>
      </div>

      {/* 📚 BOOK GRID */}
      <div className="book-grid">
        {books.map(book => (
          <div
            key={book._id}
            className="book-card"
            onClick={() => handleBookClick(book._id)}
          >
            <img
              src={book.image || `https://via.placeholder.com/200x300?text=${encodeURIComponent(book.title)}`}
              alt={book.title}
            />
            <h3>{book.title}</h3>
            <p className="author">by {book.author}</p>
            <p className="price">₹{book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


