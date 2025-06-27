import { useEffect, useState } from 'react';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error('❌ Failed to load orders:', err));
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h2>📦 Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {orders.map(order =>
            order.items.map((item, index) => {
              const book = item.bookId; // populated book data
              return (
                <div
                  key={index}
                  style={{
                    background: '#fff',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                  }}
                >
                  <img
                    src={book?.image || 'https://via.placeholder.com/200x300?text=No+Image'}
                    alt={book?.title || 'Book'}
                    style={{
                      width: '100%',
                      height: '220px',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                  <h3>{book?.title || 'Untitled Book'}</h3>
                  <p>by {book?.author || 'Unknown'}</p>
                  <p style={{ color: '#28a745', fontWeight: 'bold' }}>
                    ₹{book?.price ?? 'N/A'}
                  </p>
                  <p>🛒 Quantity: {item.quantity}</p>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default Orders;
