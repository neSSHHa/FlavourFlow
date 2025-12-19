import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  
  const [portions, setPortions] = useState(1);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState('');
  const [calculated, setCalculated] = useState([]); 

  useEffect(() => {
    fetch(`http://localhost:8080/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch(() => setRecipe(null));
  }, [id]);

  const handleCalculate = async () => {
    setCalcError('');
    setCalcLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/recipes/${id}/ingredients/calculate?portions=${encodeURIComponent(portions)}`
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setCalculated(data);
    } catch (e) {
      setCalculated([]);
      setCalcError('Ne morem izracunat sastoje invalid endpoint.');
    } finally {
      setCalcLoading(false);
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Duration:</strong> {recipe.durationMinutes} minutes</p>

      <hr />

      <h3>Preračun sestavina</h3>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <label>
          Broj porcija:&nbsp;
          <input
            type="number"
            min="1"
            step="1"
            value={portions}
            onChange={(e) => setPortions(Number(e.target.value))}
            style={{ width: 90 }}
          />
        </label>

        <button onClick={handleCalculate} disabled={calcLoading}>
          {calcLoading ? 'Računam...' : 'Izračunaj'}
        </button>
      </div>

      {calcError && <p style={{ color: 'red' }}>{calcError}</p>}

      {calculated.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h4>Sestavine za {portions} porcija</h4>
          <ul>
            {calculated.map((ing) => (
              <li key={ing.id}>
                {ing.title} — <strong>{Number(ing.kolicinaGram).toFixed(1)} g</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr />
      <Link to="/">← Back to all recipes</Link>
    </div>
  );
};

export default RecipeDetail;
