import React from 'react';
import getUserId from '../utils/getUserId'; // adjust path if needed

function Cart() {
  const userId = getUserId();
  const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

  return (
    <div style={{ padding: '30px' }}>
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {cart.map((book, index) => (
            <div key={index} style={{
              background: '#fff',
              padding: '15px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <img
                src={book.image || 'https://via.placeholder.com/200x300?text=No+Image'}
                alt={book.title}
                style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '6px' }}
              />
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <p style={{ color: '#28a745', fontWeight: 'bold' }}>₹{book.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
