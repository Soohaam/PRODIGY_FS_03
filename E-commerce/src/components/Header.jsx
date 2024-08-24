import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaSignInAlt, FaShoppingCart, FaBoxOpen } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); 
    navigate('/');
  };

  return (
    <header className="header">
      <nav>
        <div className="logo">
          <Link to="/">MyStore</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/ProductListPage">
              <FaBoxOpen /> {/* Products icon */}
              Products
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/cart">
                  <FaShoppingCart />
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/OrderListPage">
                  <FaBoxOpen /> 
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <FaUserCircle /> 
                  sujal9867
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> 
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">
                  <FaSignInAlt />
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <FaSignInAlt /> 
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
