import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/RecipeList.css';

const FavoritesList = ({ user, onFavoriteRemoved }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:8080/api/favorites';

  useEffect(() => {
    if (user && user.token) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user || !user.token) {
      setError('Morate biti prijavljeni za pregled priljubljenih receptov.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        setError('Niste prijavljeni. Prosimo, prijavite se.');
        setFavoriteRecipes([]);
      } else if (response.ok) {
        const data = await response.json();
        setFavoriteRecipes(data || []);
      } else {
        setError('Napaka pri nalaganju priljubljenih receptov.');
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError('Napaka pri povezavi s strežnikom.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (recipeId) => {
    if (!user || !user.token) {
      alert('Morate biti prijavljeni za odstranitev priljubljenih receptov.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok || response.status === 204) {
        // Ukloni recept iz liste
        setFavoriteRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
        // Ažuriraj favorites state u App.js
        if (onFavoriteRemoved) {
          onFavoriteRemoved(recipeId);
        }
      } else if (response.status === 401) {
        alert('Niste prijavljeni. Prosimo, prijavite se.');
      } else {
        alert('Napaka pri odstranitvi priljubljenega recepta.');
      }
    } catch (err) {
      console.error('Error removing favorite:', err);
      alert('Napaka pri povezavi s strežnikom.');
    }
  };

  if (!user) {
    return (
      <div className="recipe-list">
        <h2>Priljubljeni recepti</h2>
        <p>Morate biti prijavljeni za pregled priljubljenih receptov.</p>
        <Link to="/login">
          <button className="btn-edit">Prijavite se</button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="recipe-list">
        <h2>Priljubljeni recepti</h2>
        <p>Nalaganje...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recipe-list">
        <h2>Priljubljeni recepti</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      <h2>Priljubljeni recepti</h2>

      {favoriteRecipes.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>Nimate priljubljenih receptov.</p>
          <Link to="/">
            <button className="btn-edit">Preglejte recepte</button>
          </Link>
        </div>
      ) : (
        favoriteRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-card-header">
              <h3>
                <Link to={`/recipe/${recipe.id}`} className="recipe-title">
                  {recipe.title}
                </Link>
              </h3>
              <button
                className="favorite-btn active"
                onClick={() => handleRemoveFavorite(recipe.id)}
                aria-label="Odstrani iz priljubljenih"
                title="Odstrani iz priljubljenih"
              >
                <svg 
                  className="heart-icon" 
                  viewBox="0 0 24 24" 
                  fill="#ff6f61" 
                  stroke="#ff6f61"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>

            <p><strong>Duration:</strong> {recipe.durationMinutes} min</p>

            {recipe.calorie && (
              <p><strong>Calories:</strong> {recipe.calorie} kcal</p>
            )}

            <div className="button-group">
              <Link to={`/recipe/${recipe.id}`}>
                <button className="btn-edit">View Details</button>
              </Link>
              <button 
                className="btn-delete" 
                onClick={() => handleRemoveFavorite(recipe.id)}
              >
                Odstrani iz priljubljenih
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;

