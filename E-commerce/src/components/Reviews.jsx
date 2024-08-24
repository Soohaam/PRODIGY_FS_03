import React from 'react';
import StarRating from './StarRating'; 
import './Reviews.css';

const Reviews = ({ reviews = [] }) => (
  <div className="reviews">
    <h2>Reviews</h2>
    {reviews.length === 0 ? (
      <p>No reviews yet.</p>
    ) : (
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <strong className="reviewer-name">{review.user?.name || 'Anonymous'}</strong>
            <p className="review-comment">{review.comment}</p>
            <div className="rating-container">
              <StarRating rating={review.rating} onChange={() => {}} />
              <p className="rating-text">Rating: {review.rating}/5</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Reviews;
