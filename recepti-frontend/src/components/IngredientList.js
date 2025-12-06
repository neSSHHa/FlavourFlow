import React from 'react';
import './css/RecipeList.css';

const IngredientList = ({ ingredients, onDelete }) => {
  return (
    <div className="recipe-list">
      <h2>Ingredients</h2>

      {ingredients.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          No ingredients yet. Add your first ingredient!
        </p>
      ) : (
        ingredients.map((ingredient) => (
          <div key={ingredient.id} className="recipe-card">
            <h3 style={{ color: '#ff6f61', marginBottom: '10px' }}>
              {ingredient.title}
            </h3>

            <div className="button-group">
              <button 
                className="btn-delete" 
                onClick={() => onDelete(ingredient.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default IngredientList;

