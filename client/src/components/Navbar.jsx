import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const sync = () => {
      setToken(localStorage.getItem('token'));
      setRole(localStorage.getItem('role'));
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const logout = () => {
    const userId = JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || '{}')).id;
    const wishlist = localStorage.getItem(`wishlist_${userId}`);
    const cart = localStorage.getItem(`cart_${userId}`);
    localStorage.clear();
    if (wishlist) localStorage.setItem(`wishlist_${userId}`, wishlist);
    if (cart) localStorage.setItem(`cart_${userId}`, cart);
    setToken(null);
    setRole(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  const getNavLinkClass = ({ isActive }) =>
    `navbar-link${isActive ? ' active' : ''}`;

  return (
    <nav className="navbar">
      <div className="navbar-title">BookNest</div>
      <div className="navbar-links">
        <NavLink to="/" className={getNavLinkClass}>Home</NavLink>

        {!token && (
          <>
            <NavLink to="/login" className={getNavLinkClass}>Login</NavLink>
            <NavLink to="/register-user" className={getNavLinkClass}>Register as User</NavLink>
            <NavLink to="/register-seller" className={getNavLinkClass}>Register as Seller</NavLink>
          </>
        )}

        {token && role === 'user' && (
          <>
            <NavLink to="/cart" className={getNavLinkClass}>Cart</NavLink>
            <NavLink to="/wishlist" className={getNavLinkClass}>Wishlist</NavLink>
            <NavLink to="/orders" className={getNavLinkClass}>Orders</NavLink>
            <button onClick={logout} className="navbar-button">Logout</button>
          </>
        )}

        {token && role === 'seller' && (
          <>
            <NavLink to="/add-book" className={getNavLinkClass}>Add Book</NavLink>
            <NavLink to="/your-products" className={getNavLinkClass}>Your Products</NavLink>
            <NavLink to="/customer-orders" className={getNavLinkClass}>Customer Orders</NavLink>
            <button onClick={logout} className="navbar-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
