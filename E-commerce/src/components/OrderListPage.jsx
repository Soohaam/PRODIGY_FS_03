import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaExclamationTriangle, FaEye } from 'react-icons/fa';
import './OrderListPage.css';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'x-auth-token': token };
        const response = await axios.get('http://localhost:5000/api/orders/orders', { headers });
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!orders.length) return (
    <div className="no-orders">
      <FaExclamationTriangle size={50} className="no-orders-icon" />
      <p>No orders found. <Link to="/ProductListPage" className="browse-link">Browse products</Link> to place an order.</p>
    </div>
  );

  return (
    <div className="order-list-container">
      <h1 className="order-list-title">Order List</h1>
      <ul className="order-list">
        {orders.map(order => (
          <li key={order._id} className="order-item">
            <FaShoppingCart size={24} className="order-icon" />
            <div className="order-details">
              <p><strong>Order ID:</strong> <span className="order-id">{order._id}</span></p>
              <p><strong>Status:</strong> <span className="order-status">{order.status}</span></p>
              <p><strong>Total Price:</strong> <span className="order-price">₹{order.totalPrice.toFixed(2)}</span></p>
              <p><strong>Shipping Address:</strong> <span className="order-address">{order.shippingAddress}</span></p>
              <Link to={`/orders/${order._id}`} className="view-details-link">
                <FaEye size={18} /> View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderListPage;
