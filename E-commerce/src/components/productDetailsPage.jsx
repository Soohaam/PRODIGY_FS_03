import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import Reviews from './Reviews'; 
import AddReviewForm from './AddReviewForm';
import StarRating from './StarRating';
import './ProductDetailsPage.css'; 

const ProductDetailsPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'x-auth-token': token };
        
        const productResponse = await axios.get(`http://localhost:5000/api/products/products/${id}`, { headers });
        setProduct(productResponse.data);

        const reviewsResponse = await axios.get(`http://localhost:5000/api/reviews/reviews/${id}`, { headers });
        setReviews(reviewsResponse.data);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to add items to the cart.');
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      };

      await axios.post('http://localhost:5000/api/cart/items', { productName: product.name, quantity }, { headers });
      alert('Item added to cart');
    } catch (err) {
      setError('Failed to add item to cart.');
      console.error('Failed to add item to cart:', err);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-details-container">
      <div className="product-details-content">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">₹{product.price}</p>
          <p className="product-rating">
            Average Rating: <StarRating rating={product.averageRating} />
          </p>
          <p className="product-review-count">Number of Reviews: {product.numReviews}</p>
          <div className="quantity-container">
            <input 
              type="number" 
              value={quantity} 
              min="1" 
              onChange={handleQuantityChange} 
              className="quantity-input"
            />
            <button onClick={handleAddToCart} className="add-to-cart-button">
              <FaCartPlus /> Add to Cart
            </button>
          </div>
          <AddReviewForm productId={id} /> 
        </div>
      </div>
      <div className="reviews-section">
        <Reviews reviews={reviews} /> 
      </div>
    </div>
  );
};

export default ProductDetailsPage;
