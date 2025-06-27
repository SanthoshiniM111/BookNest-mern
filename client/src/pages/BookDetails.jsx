import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import getUserId from '../utils/getUserId'; // ✅ Import this at the top

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isLoggedIn = !!token;
  const isSeller = role === 'seller';


  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const addToCart = () => {
  if (!isLoggedIn) return navigate('/login');
  const userId = getUserId();
  if (!userId) return alert("Please log in again.");

  const cartKey = `cart_${userId}`;
  const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

  // Optional: Prevent duplicates
  if (existingCart.some(b => b._id === book._id)) {
    return alert(`${book.title} is already in your cart`);
  }

  existingCart.push(book);
  localStorage.setItem(cartKey, JSON.stringify(existingCart));
  alert(`${book.title} added to cart`);
};
  const addToWishlist = () => {
  if (!isLoggedIn) return navigate('/login');
  const userId = getUserId();
  if (!userId) return alert("Please log in again.");

  const wishlistKey = `wishlist_${userId}`;
  const existingWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

  // Optional: Prevent duplicates
  if (existingWishlist.some(b => b._id === book._id)) {
    return alert(`${book.title} is already in your wishlist`);
  }

  existingWishlist.push(book);
  localStorage.setItem(wishlistKey, JSON.stringify(existingWishlist));
  alert(`${book.title} added to wishlist`);
};

  const orderNow = () => {
    if (!isLoggedIn) return navigate('/login');
    navigate(`/order/${book._id}`);
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <img 
        src={book.image || 'https://via.placeholder.com/300x400?text=No+Image'} 
        alt={book.title}
        style={{ width: '300px', height: '400px', objectFit: 'cover', marginBottom: '20px' }}
      />
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre || 'N/A'}</p>
      <p style={{ fontSize: '20px', color: 'green' }}>₹{book.price}</p>

      {/* 🔽 Action Buttons */}
      {!isSeller && (
     <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
    <button onClick={addToCart} style={btnStyle}>Add to Cart</button>
    <button onClick={addToWishlist} style={{ ...btnStyle, background: '#e83e8c' }}>Wishlist</button>
    <button onClick={orderNow} style={{ ...btnStyle, background: '#17a2b8' }}>Order Now</button>
    </div>
    )}
    </div>
  );
}

const btnStyle = {
  padding: '10px 20px',
  background: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default BookDetail;

