import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/RecipeList.css';

const RecipeIngredients = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = `http://localhost:8080/api/recipes/${id}`;
  const INGREDIENTS_API_URL = `http://localhost:8080/api/recipes/${id}/ingredients`;

  useEffect(() => {
    fetchRecipe();
    fetchIngredients();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setRecipe(data);
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const fetchIngredients = async () => {
    try {
      setLoading(true);
      const res = await fetch(INGREDIENTS_API_URL);
      if (res.ok) {
        const data = await res.json();
        setIngredients(data);
      }
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (index) => {
    const updated = [...ingredients];
    updated[index].selected = !updated[index].selected;
    if (!updated[index].selected) {
      updated[index].kolicinaGram = null;
    } else if (updated[index].kolicinaGram === null) {
      updated[index].kolicinaGram = 0.0;
    }
    setIngredients(updated);
  };

  const handleQuantityChange = (index, value) => {
    const updated = [...ingredients];
    updated[index].kolicinaGram = value === '' ? null : parseFloat(value) || 0.0;
    setIngredients(updated);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(INGREDIENTS_API_URL, {  
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ingredients),
      });

      if (res.ok) {
        navigate('/');
      } else {
        alert('Error saving ingredients');
      }
    } catch (error) {
      console.error('Error saving ingredients:', error);
      alert('Error saving ingredients');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="recipe-detail">Loading...</div>;
  }

  return (
    <div className="recipe-detail">
      <h2>Edit Ingredients: {recipe?.title}</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Select ingredients and specify quantities:</strong></p>
      </div>

      <div className="ingredients-list">
        {ingredients.map((ing, index) => (
          <div key={ing.id} className="ingredient-item" style={{
            border: '1px solid #ff6f61',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '10px',
            background: ing.selected ? '#fff8f0' : '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <input
              type="checkbox"
              checked={ing.selected}
              onChange={() => handleToggle(index)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <label style={{ 
              flex: 1, 
              fontWeight: ing.selected ? 'bold' : 'normal',
              color: ing.selected ? '#ff6f61' : '#666',
              cursor: 'pointer'
            }} onClick={() => handleToggle(index)}>
              {ing.title}
            </label>
            {ing.selected && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={ing.kolicinaGram !== null ? ing.kolicinaGram : ''}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  placeholder="grams"
                  style={{
                    width: '100px',
                    padding: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
                <span style={{ color: '#666' }}>g</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="button-group" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button className="btn-edit" onClick={handleSave}>
          Save
        </button>
        <button className="btn-delete" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RecipeIngredients;

