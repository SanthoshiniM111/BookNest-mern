import { useState } from 'react';
import axios from 'axios';
import '../styles/addbook.css'; // ✅ Import the CSS

function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    image: ''
  });

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("📦 Sending form data:", formData);
      console.log("🔐 Token:", token);

      const res = await axios.post('http://localhost:5000/api/books', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('✅ Book added successfully!');
      setFormData({ title: '', author: '', genre: '', price: '', image: '' });
    } catch (err) {
      console.error("❌ Error adding book:", err);
      alert('❌ Failed to add book: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="addbook-container">
      <h2 className="addbook-title">📚 Add a New Book</h2>
      <form onSubmit={handleSubmit} className="addbook-form">
        <input name="title" placeholder="Title" onChange={handleChange} value={formData.title} required />
        <input name="author" placeholder="Author" onChange={handleChange} value={formData.author} required />
        <input name="genre" placeholder="Genre" onChange={handleChange} value={formData.genre} />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} value={formData.price} required />
        <input name="image" placeholder="Image URL" onChange={handleChange} value={formData.image} />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
