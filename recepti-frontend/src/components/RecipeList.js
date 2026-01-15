import React from 'react';
import { Link } from 'react-router-dom';
import './css/RecipeList.css';

const RecipeList = ({ recipes, onEdit, onDelete, favorites, onToggleFavorite, user }) => {
  const isFavorite = (recipeId) => favorites && favorites.has(recipeId);

  const handleFavoriteClick = (e, recipeId) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite && user) {
      onToggleFavorite(recipeId);
    }
  };

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>

      {recipes.map((r) => (
        <div key={r.id} className="recipe-card">
          {/* Header z naslovom in srčkom */}
          <div className="recipe-card-header">
            <h3>
              <Link to={`/recipe/${r.id}`} className="recipe-title">
                {r.title}
              </Link>
            </h3>
            {user && (
              <button
                className={`favorite-btn ${isFavorite(r.id) ? 'active' : ''}`}
                onClick={(e) => handleFavoriteClick(e, r.id)}
                aria-label={isFavorite(r.id) ? 'Odstrani iz priljubljenih' : 'Dodaj med priljubljene'}
                title={isFavorite(r.id) ? 'Odstrani iz priljubljenih' : 'Dodaj med priljubljene'}
              >
                <svg 
                  className="heart-icon" 
                  viewBox="0 0 24 24" 
                  fill={isFavorite(r.id) ? '#ff6f61' : 'none'} 
                  stroke={isFavorite(r.id) ? '#ff6f61' : 'currentColor'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span className="heart-particles"></span>
              </button>
            )}
          </div>

          <p><strong>Duration:</strong> {r.durationMinutes} min</p>

          <div className="button-group">
            <button className="btn-edit" onClick={() => onEdit(r)}>
              Edit
            </button>
            <Link to={`/recipe/${r.id}/ingredients`}>
              <button className="btn-edit" style={{ marginRight: '8px' }}>
                Edit Ingredients
              </button>
            </Link>
            <button className="btn-delete" onClick={() => onDelete(r.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
