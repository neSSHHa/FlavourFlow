import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Obriši sve iz localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    
    // Pozovi callback za ažuriranje state-a u App.js
    onLogout();
    
    // Preusmeri na login
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            <h1>Flavor Flow</h1>
          </Link>
          <nav className="main-nav">
            <Link to="/" className="nav-link">Recipes</Link>
            <Link to="/ingredients" className="nav-link">Ingredients</Link>
            <Link to="/shopping-list" className="nav-link">Shopping list</Link>
            {user && (
              <Link to="/favorites" className="nav-link">Favorites</Link>
            )}
          </nav>
        </div>

        <div className="user-section">
          {user ? (
            <>
              <span className="user-info">
                Welcome, <strong>{user.username}</strong>
                {user.role === 'ADMIN' && <span className="role-badge">ADMIN</span>}
              </span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link register-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

