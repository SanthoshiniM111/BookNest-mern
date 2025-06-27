import { Link } from 'react-router-dom';
import '../styles/Dashboard.css'; // ✅ Use consistent styling

function SellerDashboard() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📦 Welcome, Seller!</h2>

      <div className="dashboard-links">
        <Link to="/" className="dashboard-link seller-link">🏠 Home</Link>
        <Link to="/your-products" className="dashboard-link seller-link">📚 Your Products</Link>
        <Link to="/add-book" className="dashboard-link seller-link">➕ Add Book</Link>
        <Link to="/customer-orders" className="dashboard-link seller-link">🛒 Customer Orders</Link>
      </div>
    </div>
  );
}

export default SellerDashboard;
