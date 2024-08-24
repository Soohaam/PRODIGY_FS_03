import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShippingFast, FaCreditCard, FaCalendarAlt, FaLock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import './CartPage.css';

const CheckoutPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [amount, setAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'x-auth-token': token };
        const response = await axios.get('http://localhost:5000/api/cart/items', { headers });
        setCart(response.data);
        setAmount(response.data.items.reduce((acc, item) => acc + item.price * item.quantity, 0));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cart');
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (productName) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'x-auth-token': token };
      await axios.delete(`http://localhost:5000/api/cart/cart/${productName}`, { headers });
      setCart(cart => ({
        ...cart,
        items: cart.items.filter(item => item.productName !== productName)
      }));
    } catch (err) {
      setError('Failed to remove item');
      console.error('Failed to remove item:', err);
    }
  };

  const handlePayment = async () => {
    setError(null);
    setSuccess(null);

    if (!shippingAddress || !creditCardNumber || !expirationDate || !cvv) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const headers = { 'x-auth-token': token };
      await axios.post('http://localhost:5000/api/payment/pay', 
        { amount, shippingAddress, creditCardNumber, expirationDate, cvv },
        { headers }
      );
      setSuccess('Payment successful! Your order has been placed.');
      setTimeout(() => navigate('/'), 3000); 
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Payment failed. Please try again.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!cart || !cart.items.length) return <p>Your cart is empty. Please add items to your cart before proceeding to checkout.</p>;

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="order-summary">
        <h2><FaShippingFast /> Order Summary</h2>
        <ul>
          {cart.items.map(item => (
            <li key={item.productName}>
              <img src={item.image} alt={item.productName} />
              <div>
                <p>{item.productName}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <button onClick={() => handleRemoveItem(item.productName)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <h3>Total Amount: ₹{amount.toFixed(2)}</h3>
      </div>
      <div className="payment-info">
        <h2><FaCreditCard /> Payment Information</h2>
        <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
          <div>
            <label>
              <FaShippingFast /> Shipping Address:
              <input 
                type="text" 
                value={shippingAddress} 
                onChange={(e) => setShippingAddress(e.target.value)} 
                required
              />
            </label>
          </div>
          <div>
            <label>
              <FaCreditCard /> Credit Card Number:
              <input 
                type="text" 
                placeholder="XXXX-XXXX-XXXX-XXXX" 
                value={creditCardNumber}
                onChange={(e) => setCreditCardNumber(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <FaCalendarAlt /> Expiration Date:
              <input 
                type="text" 
                placeholder="MM/YY" 
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              <FaLock /> CVV:
              <input 
                type="text" 
                placeholder="XXX" 
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Pay Now</button>
        </form>
        {error && <div className="error-message"><FaExclamationTriangle /> <p>{error}</p></div>}
        {success && <div className="success-message"><FaCheckCircle /> <p>{success}</p></div>}
      </div>
    </div>
  );
};

export default CheckoutPage;
