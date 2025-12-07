import React from 'react';
import { Link } from 'react-router-dom';
import './css/RecipeList.css';

const RecipeList = ({ recipes, onEdit, onDelete }) => {
  return (
    <div className="recipe-list">
      <h2>Recipes</h2>

      {recipes.map((r) => (
        <div key={r.id} className="recipe-card">
          {/* Klikljiv naslov */}
          <h3>
            <Link to={`/recipe/${r.id}`} className="recipe-title">
              {r.title}
            </Link>
          </h3>

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
