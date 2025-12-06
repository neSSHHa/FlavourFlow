import React, { useState } from 'react';
import './css/RecipeList.css';

export default function IngredientForm({ onSave }) {
  const [ingredient, setIngredient] = useState({
    title: ""
  });

  const handleChange = (e) => {
    setIngredient({ ...ingredient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredient.title.trim() === '') {
      return;
    }
    onSave(ingredient);
    setIngredient({ title: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2 style={{ color: '#ff6f61', marginBottom: '15px' }}>Add New Ingredient</h2>
      <input
        name="title"
        value={ingredient.title}
        onChange={handleChange}
        placeholder="Ingredient name"
        required
      />
      <div className="form-buttons">
        <button type="submit">Add Ingredient</button>
      </div>
    </form>
  );
}

