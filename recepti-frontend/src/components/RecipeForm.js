import React, { useState, useEffect } from 'react';
import './css/RecipeList.css';

export default function RecipeForm({ onSave, editData, onCancel }) {
  // trenutni vrednosti polj v formi
  const [recipe, setRecipe] = useState({
    title: "",
    instructions: "",
    durationMinutes: ""
  });

  // nalozi podatke za urejanje, ali počisti formo, in updatira ob spremembi editData
  useEffect(() => {
    if (editData) {
      setRecipe(editData);
    } else {
      setRecipe({
        title: "",
        instructions: "",
        durationMinutes: ""
      });
    }
  }, [editData]);

  // posodablja stanje ob tipkanju
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // pošlje podatke navzgor
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(recipe);
    
    setRecipe({
      title: "",
      instructions: "",
      durationMinutes: ""
    });
  };

  const handleCancelClick = () => {
    onCancel(); 
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <input
        name="title"
        value={recipe.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="instructions"
        value={recipe.instructions}
        onChange={handleChange}
        placeholder="Instructions"
      />
      <input
        name="durationMinutes"
        type="number"
        value={recipe.durationMinutes}
        onChange={handleChange}
        placeholder="Duration (min)"
      />

      <button type="submit" className="btn-edit">{editData ? "Update" : "Add"}</button>
      {editData && (
        <button type="button" className="btn-delete" onClick={handleCancelClick}>
          Cancel
        </button>
      )}
    </form>
  );
}
