import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // ✅ Import for styling

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders/seller-orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to load orders:', err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📦 Customer Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-message">No orders placed for your books yet.</p>
      ) : (
        <div className="products-grid">
          {orders.map((order, index) => (
            <div key={index} className="product-card">
              <h3 className="product-title">📘 {order.title}</h3>
              <p className="product-author">by {order.author}</p>
              <p className="product-price">₹{order.price}</p>
              <p>🛒 <strong>Total Ordered:</strong> {order.totalOrders}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerOrders;

