// src/components/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaLeaf, FaTruck, FaHeart, FaInfoCircle } from 'react-icons/fa';
import "./HomePage.css"

const HomePage = () => {
  const featuredArticles = [
    {
      title: 'The Best Organic Products for Your Family',
      description: 'Discover the top organic products available in our store that are perfect for maintaining a healthy lifestyle.',
      link: '/articles/best-organic-products',
    },
    {
      title: 'How We Source Our Fresh Groceries',
      description: 'Learn about our commitment to sourcing the freshest groceries from trusted local farmers and producers.',
      link: '/articles/sourcing-fresh-groceries',
    },
    {
      title: 'Customer Favorites: Top 10 Grocery Items',
      description: 'Explore our customers’ favorite grocery items and see what makes them the best sellers in our store.',
      link: '/articles/top-10-grocery-items',
    },
  ];

  return (
    <div className="homepage">
      <header className="header">
        <h1 className="header-title">Welcome to Our Grocery Store</h1>
        <p className="header-subtitle">Your one-stop shop for fresh and organic groceries</p>
      </header>

      <section className="intro">
        <h2><FaInfoCircle /> About Us</h2>
        <p>We are a local retailer dedicated to providing the freshest and highest quality groceries. Our store is committed to sustainability and supporting local farmers. From organic produce to everyday essentials, we offer a wide range of products to meet your needs.</p>
        <p>Our story began with a simple goal: to offer our community the best possible shopping experience with a focus on quality and service. Visit us and experience the difference.</p>
      </section>

      <section className="featured-articles">
        <h2><FaStar /> Featured Articles</h2>
        <div className="articles-container">
          {featuredArticles.map((article, index) => (
            <div key={index} className="article-box">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <Link to={article.link} className="read-more-link">Read More</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="store-highlights">
        <h2><FaHeart /> Store Highlights</h2>
        <div className="highlight-boxes">
          <div className="highlight">
            <FaLeaf size={40} />
            <h3>Quality Products</h3>
            <p>We handpick each item to ensure that you get the best quality groceries every time.</p>
          </div>
          <div className="highlight">
            <FaTruck size={40} />
            <h3>Local Sourcing</h3>
            <p>Our products come from local farms and producers, supporting the community and ensuring freshness.</p>
          </div>
          <div className="highlight">
            <FaHeart size={40} />
            <h3>Customer Satisfaction</h3>
            <p>Your satisfaction is our priority. We offer exceptional customer service and support to make your shopping experience enjoyable.</p>
          </div>
        </div>
      </section>

      <section className="customer-reviews">
        <h2><FaStar /> Customer Reviews</h2>
        <div className="review">
          <h3>Soham Bhaye</h3>
          <p>"Fantastic store! The quality of the produce is unmatched and the staff are always friendly and helpful."</p>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} color={index < 4 ? 'gold' : 'gray'} />
            ))}
          </div>
        </div>
        <div className="review">
          <h3>Oshnikdeep Tiwari</h3>
          <p>"I love shopping here for my organic groceries. The selection is great and I always find what I need."</p>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} color={index < 5 ? 'gold' : 'gray'} />
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 Grocery Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
