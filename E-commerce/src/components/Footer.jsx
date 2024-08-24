import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-info">
        <h4>Contact Us</h4>
        <p>Email: sujalshah630@gmail.com</p>
        <p>Phone: +91 9029517041</p>
      </div>
      <div className="social-links">
        <h4 className="follow-us" >Follow Us</h4>
        <div>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
      <div>
        <Link to="/contact">Contact Page</Link>
        <Link to="/about">About Us</Link>
      </div>
      <p>&copy; {new Date().getFullYear()} My E-Commerce Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
