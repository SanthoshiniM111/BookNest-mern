import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css'; // ✅ Import consistent styling

function UserDashboard() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">👋 Welcome to Your Dashboard</h2>

      <div className="dashboard-links">
        <Link to="/" className="dashboard-link">🏠 Home</Link>
        <Link to="/wishlist" className="dashboard-link">💖 Wishlist</Link>
        <Link to="/orders" className="dashboard-link">📦 Orders</Link>
        <Link to="/cart" className="dashboard-link">🛒 Cart</Link>
      </div>
    </div>
  );
}

export default UserDashboard;
