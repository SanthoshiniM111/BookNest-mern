import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/orderPage.css'; // Create if you want consistent styling

function OrderPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    quantity: 1,
    address: '',
    phone: ''
  });

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error("❌ Failed to fetch book:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!book) return;

    try {
      await axios.post(
        'http://localhost:5000/api/orders',
        {
          customerName: formData.customerName,
          address: formData.address,
          phone: formData.phone,
          items: [
            {
              bookId: book._id,
              quantity: Number(formData.quantity)
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Order placed successfully!");
      navigate('/user-dashboard');
    } catch (err) {
      console.error("❌ Order failed:", err.response?.data || err.message);
      alert("❌ Failed to place order");
    }
  };

  if (!book) return <p>Loading book...</p>;

  return (
    <div className="order-container">
      <h2>🧾 Order Book: {book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Price: ₹{book.price}</p>

      <form onSubmit={placeOrder} className="order-form">
        <input
          name="customerName"
          placeholder="Your Name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          min="1"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button type="submit" className="order-button">🛒 Place Order</button>
      </form>
    </div>
  );
}

export default OrderPage;
