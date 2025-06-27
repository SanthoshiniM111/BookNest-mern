import { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css'; // ✅ Reuse consistent styling

function RegisterSeller() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        ...formData,
        role: 'seller' // explicitly registering as seller
      });
      alert('✅ Seller registration successful. You can now login.');
      console.log('Success:', res.data);
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register as Seller</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterSeller;
