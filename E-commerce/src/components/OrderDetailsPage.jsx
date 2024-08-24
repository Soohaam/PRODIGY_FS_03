import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaBox, FaTag, FaMapMarkerAlt, FaRupeeSign, FaSortNumericUp } from 'react-icons/fa';
import { IoMdAlert } from 'react-icons/io';
import './OrderDetailsPage.css';

const OrderDetailsPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'x-auth-token': token };
        const response = await axios.get(`http://localhost:5000/api/orders/orders/${id}`, { headers });
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text"><IoMdAlert /> {error}</p>;
  if (!order) return <p className="error-text">Order not found</p>;

  return (
    <div id="order-details-container">
      <h1 id="order-details-title">Order Details</h1>
      <div id="order-summary">
        <h2 className="order-id">Order ID: {order._id}</h2>
        <p className="order-status"><FaBox /> Status: <span>{order.status}</span></p>
        <p className="order-price"><FaRupeeSign /> Total Price: <span>₹{order.totalPrice.toFixed(2)}</span></p>
        <p className="order-shipping"><FaMapMarkerAlt /> Shipping Address: <span>{order.shippingAddress}</span></p>
      </div>
      <h3 id="items-title">Items</h3>
      <ul id="items-list">
        {order.items.map((item, index) => (
          <li key={index} className="item">
            <img src={item.image} alt={item.productName} className="item-image" />
            <div className="item-details">
              <p className="item-name"><FaTag /> Product: <span>{item.productName}</span></p>
              <p className="item-quantity"><FaSortNumericUp /> Quantity: <span>{item.quantity}</span></p>
              <p className="item-price"><FaRupeeSign /> Price: <span>₹{item.price}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetailsPage;
