import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import RegisterUser from './pages/RegisterUser';
import RegisterSeller from './pages/RegisterSeller';
import UserDashboard from './pages/UserDashboard';
import Wishlist from './pages/Wishlist';
import SellerDashboard from './pages/SellerDashboard';
import AddBook from './pages/AddBook';
import CustomerOrders from './pages/CustomerOrders';
import YourProducts from './pages/YourProducts';
import BookDetails from './pages/BookDetails';
import OrderPage from './pages/OrderPage';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/register-seller" element={<RegisterSeller />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/your-products" element={<YourProducts />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/customer-orders" element={<CustomerOrders />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/order/:id" element={<OrderPage />} />
         
          
          

        </Routes>
      </div>
    </>
  );
}

export default App;
