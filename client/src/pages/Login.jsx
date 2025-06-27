import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // ✅ Uses consistent styling

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      const token = res.data.token;
      if (!token) throw new Error("No token received");

      localStorage.setItem('token', token);

      // Decode JWT and store role
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      localStorage.setItem('role', decoded.role);

      // Force Navbar update
      window.dispatchEvent(new Event('storage'));

      // Redirect based on role
      if (decoded.role === 'seller') {
        navigate('/seller-dashboard');
      } else {
        navigate('/user-dashboard');
      }

    } catch (err) {
      console.error("❌ Login Error:", err);
      alert(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
