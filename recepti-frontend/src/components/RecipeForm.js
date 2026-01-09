import React, { useState, useEffect } from 'react';
import './css/RecipeList.css';

export default function RecipeForm({ onSave, editData, onCancel }) {
  // trenutni vrednosti polj v formi
  const [recipe, setRecipe] = useState({
    title: "",
    instructions: "",
    durationMinutes: "",
    calorie: "",
    proteinGram: "",
    fatGram: "",
    carbsGram: ""
  });

  // nalozi podatke za urejanje, ali počisti formo, in updatira ob spremembi editData
  useEffect(() => {
    if (editData) {
      setRecipe({
        title: editData.title || "",
        instructions: editData.instructions || "",
        durationMinutes: editData.durationMinutes !== null && editData.durationMinutes !== undefined ? editData.durationMinutes : "",
        calorie: editData.calorie !== null && editData.calorie !== undefined ? editData.calorie : "",
        proteinGram: editData.proteinGram !== null && editData.proteinGram !== undefined ? editData.proteinGram : "",
        fatGram: editData.fatGram !== null && editData.fatGram !== undefined ? editData.fatGram : "",
        carbsGram: editData.carbsGram !== null && editData.carbsGram !== undefined ? editData.carbsGram : ""
      });
    } else {
      setRecipe({
        title: "",
        instructions: "",
        durationMinutes: "",
        calorie: "",
        proteinGram: "",
        fatGram: "",
        carbsGram: ""
      });
    }
  }, [editData]);

  // posodablja stanje ob tipkanju
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Za številčna polja pretvori v število ali pustimo prazno
    if (name === "durationMinutes" || name === "calorie" || name === "proteinGram" || name === "fatGram" || name === "carbsGram") {
      setRecipe({ ...recipe, [name]: value === "" ? "" : value });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  // pošlje podatke navzgor
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Pripravi podatke za pošiljanje - pretvori prazne stringe v null za številčna polja
    const recipeToSave = {
      ...recipe,
      durationMinutes: recipe.durationMinutes === "" || recipe.durationMinutes === null ? null : parseInt(recipe.durationMinutes),
      calorie: recipe.calorie === "" || recipe.calorie === null ? null : parseInt(recipe.calorie),
      proteinGram: recipe.proteinGram === "" || recipe.proteinGram === null ? null : parseInt(recipe.proteinGram),
      fatGram: recipe.fatGram === "" || recipe.fatGram === null ? null : parseInt(recipe.fatGram),
      carbsGram: recipe.carbsGram === "" || recipe.carbsGram === null ? null : parseInt(recipe.carbsGram)
    };
    
    onSave(recipeToSave);
    
    setRecipe({
      title: "",
      instructions: "",
      durationMinutes: "",
      calorie: "",
      proteinGram: "",
      fatGram: "",
      carbsGram: ""
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
        min="0"
      />

      <div style={{ marginTop: '15px', marginBottom: '10px', borderTop: '1px solid #ddd', paddingTop: '15px' }}>
        <h3 style={{ color: '#ff6f61', fontSize: '1.1em', marginBottom: '10px' }}>Nutritivne vrednosti</h3>
      </div>

      <input
        name="calorie"
        type="number"
        value={recipe.calorie}
        onChange={handleChange}
        placeholder="Kalorije (kcal)"
        min="0"
      />

      <input
        name="proteinGram"
        type="number"
        value={recipe.proteinGram}
        onChange={handleChange}
        placeholder="Beljakovine (g)"
        min="0"
      />

      <input
        name="carbsGram"
        type="number"
        value={recipe.carbsGram}
        onChange={handleChange}
        placeholder="Ogljikovi hidrati (g)"
        min="0"
      />

      <input
        name="fatGram"
        type="number"
        value={recipe.fatGram}
        onChange={handleChange}
        placeholder="Maščobe (g)"
        min="0"
      />

      <div className="form-buttons">
        <button type="submit">{editData ? "Update" : "Add"}</button>
        {editData && (
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
