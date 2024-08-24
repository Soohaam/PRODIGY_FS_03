import React, { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import './AddReviewForm.css'; 

const AddReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      
      if (!token) {
        setError('You must be logged in to submit a review.');
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      await axios.post('http://localhost:5000/api/reviews/reviews', { productId, rating, comment }, config);
      setSuccess('Review added successfully!');
      setRating(1);
      setComment('');
      setError(null);
    } catch (err) {
      console.log(err);
      setError('Failed to add review.');
      setSuccess(null);
    }
  };

  return (
    <div className="add-review-form">
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="rating-section">
          <label>Rating:</label>
          <StarRating rating={rating} onChange={(newRating) => setRating(newRating)} />
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your review"
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddReviewForm;
