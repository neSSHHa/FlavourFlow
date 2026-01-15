import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = ({ favorites, onToggleFavorite, user }) => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  
  const [portions, setPortions] = useState(1);
  const [dailyCalories, setDailyCalories] = useState('');
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState('');
  const [calculated, setCalculated] = useState(null); 

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
      // Gradi URL z opcijskim dailyCalories parametrom
      let url = `http://localhost:8080/api/recipes/${id}/ingredients/calculate?portions=${encodeURIComponent(portions)}`;
      if (dailyCalories && dailyCalories !== '' && !isNaN(dailyCalories) && Number(dailyCalories) > 0) {
        url += `&dailyCalories=${encodeURIComponent(dailyCalories)}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setCalculated(data);
    } catch (e) {
      setCalculated(null);
      setCalcError('Ne morem izracunat sastoje invalid endpoint.');
    } finally {
      setCalcLoading(false);
    }
  };

  // Helper funkcija za prikaz vrednosti ali "Ni podatka"
  const formatNutritionValue = (value) => {
    if (value === null || value === undefined || value === '') {
      return 'Ni podatka';
    }
    return value;
  };

  if (!recipe) return <p>Loading...</p>;

  // Določi, katere nutritivne vrednosti prikazati
  const displayNutrition = calculated?.nutrition || {
    calorie: recipe.calorie,
    proteinGram: recipe.proteinGram,
    fatGram: recipe.fatGram,
    carbsGram: recipe.carbsGram
  };
  const displayPortions = calculated?.portions || 1;

  const isFavorite = favorites && favorites.has(parseInt(id));

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite && user) {
      onToggleFavorite(parseInt(id));
    }
  };

  return (
    <div className="recipe-detail">
      <div className="recipe-detail-header">
        <h2>{recipe.title}</h2>
        {user && (
          <button
            className={`favorite-btn-detail ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Odstrani iz priljubljenih' : 'Dodaj med priljubljene'}
            title={isFavorite ? 'Odstrani iz priljubljenih' : 'Dodaj med priljubljene'}
          >
            <svg 
              className="heart-icon-detail" 
              viewBox="0 0 24 24" 
              fill={isFavorite ? '#ff6f61' : 'none'} 
              stroke={isFavorite ? '#ff6f61' : 'currentColor'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="heart-particles-detail"></span>
          </button>
        )}
      </div>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Duration:</strong> {recipe.durationMinutes} minutes</p>

      <hr />

      {/* Sekcija Hranilne vrednosti */}
      <h3>Hranilne vrednosti</h3>
      <div style={{
        border: '1px solid #ff6f61',
        borderRadius: '8px',
        padding: '15px',
        marginTop: '10px',
        marginBottom: '20px',
        background: '#fff8f0'
      }}>
        {displayPortions !== 1 ? (
          <p style={{ marginBottom: '10px', color: '#ff6f61', fontSize: '0.95em', fontWeight: 'bold' }}>
            Za {displayPortions} porcij:
          </p>
        ) : (
          <p style={{ marginBottom: '10px', color: '#666', fontSize: '0.9em' }}>
            Za 1 porcijo:
          </p>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div style={{ padding: '8px', background: 'white', borderRadius: '4px' }}>
            <strong style={{ color: '#ff6f61' }}>Kalorije:</strong><br />
            <span style={{ fontSize: '1.1em' }}>
              {formatNutritionValue(displayNutrition.calorie)}
              {displayNutrition.calorie !== null && displayNutrition.calorie !== undefined && displayNutrition.calorie !== '' && <span style={{ color: '#666', fontSize: '0.9em' }}> kcal</span>}
            </span>
          </div>
          <div style={{ padding: '8px', background: 'white', borderRadius: '4px' }}>
            <strong style={{ color: '#ff6f61' }}>Beljakovine:</strong><br />
            <span style={{ fontSize: '1.1em' }}>
              {formatNutritionValue(displayNutrition.proteinGram)}
              {displayNutrition.proteinGram !== null && displayNutrition.proteinGram !== undefined && displayNutrition.proteinGram !== '' && <span style={{ color: '#666', fontSize: '0.9em' }}> g</span>}
            </span>
          </div>
          <div style={{ padding: '8px', background: 'white', borderRadius: '4px' }}>
            <strong style={{ color: '#ff6f61' }}>Ogljikovi hidrati:</strong><br />
            <span style={{ fontSize: '1.1em' }}>
              {formatNutritionValue(displayNutrition.carbsGram)}
              {displayNutrition.carbsGram !== null && displayNutrition.carbsGram !== undefined && displayNutrition.carbsGram !== '' && <span style={{ color: '#666', fontSize: '0.9em' }}> g</span>}
            </span>
          </div>
          <div style={{ padding: '8px', background: 'white', borderRadius: '4px' }}>
            <strong style={{ color: '#ff6f61' }}>Maščobe:</strong><br />
            <span style={{ fontSize: '1.1em' }}>
              {formatNutritionValue(displayNutrition.fatGram)}
              {displayNutrition.fatGram !== null && displayNutrition.fatGram !== undefined && displayNutrition.fatGram !== '' && <span style={{ color: '#666', fontSize: '0.9em' }}> g</span>}
            </span>
          </div>
        </div>
        {calculated && calculated.portions && calculated.portions !== 1 && (
          <p style={{ marginTop: '15px', fontSize: '0.85em', color: '#666', fontStyle: 'italic' }}>
            * Vrednosti so preračunane za {calculated.portions} porcij. Za osnovne vrednosti (1 porcija) kliknite "Izračunaj" z 1 porcijo.
          </p>
        )}
      </div>

      <hr />

      <h3>Preračun sestavina in hranilnih vrednosti</h3>

      <div style={{
        border: '1px solid #ff6f61',
        borderRadius: '8px',
        padding: '15px',
        marginTop: '10px',
        marginBottom: '20px',
        background: '#fff8f0'
      }}>
        <div style={{ display: 'flex', gap: 15, alignItems: 'center', flexWrap: 'wrap', marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <strong>Število porcij:</strong>
            <input
              type="number"
              min="1"
              step="1"
              value={portions}
              onChange={(e) => setPortions(Number(e.target.value) || 1)}
              style={{ width: 90, padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <strong>Dnevni vnos kalorij (opcijsko):</strong>
              <input
                type="number"
                min="1"
                step="1"
                value={dailyCalories}
                onChange={(e) => setDailyCalories(e.target.value)}
                placeholder="npr. 1800"
                style={{ width: 120, padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <span style={{ color: '#666', fontSize: '0.9em' }}>kcal</span>
            </div>
            <span style={{ fontSize: '0.8em', color: '#666', fontStyle: 'italic' }}>
              Potrebno za izračun DV% kalorij (vaš dnevni vnos)
            </span>
          </label>

          <button 
            onClick={handleCalculate} 
            disabled={calcLoading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff6f61',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: calcLoading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {calcLoading ? 'Računam...' : 'Izračunaj'}
          </button>
        </div>

        {calcError && <p style={{ color: 'red', marginTop: '10px' }}>{calcError}</p>}
      </div>

      {/* Prikaz rezultatov izračuna */}
      {calculated && (
        <div style={{
          border: '1px solid #ff6f61',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '20px',
          background: '#fff8f0'
        }}>
          <h4 style={{ color: '#ff6f61', marginBottom: '15px' }}>
            Rezultati za {calculated.portions} porcij
          </h4>

          {/* Preračunane sestavine */}
          {calculated.ingredients && calculated.ingredients.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h5 style={{ marginBottom: '10px', color: '#333' }}>Preračunane sestavine:</h5>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {calculated.ingredients.map((ing) => (
                  <li key={ing.id} style={{
                    padding: '8px',
                    marginBottom: '5px',
                    background: 'white',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}>
                    <strong>{ing.title}</strong> — {Number(ing.kolicinaGram).toFixed(1)} g
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skupne hranilne vrednosti */}
          {calculated.nutrition && (
            <div style={{ marginBottom: '25px' }}>
              <h5 style={{ marginBottom: '10px', color: '#333' }}>Skupne hranilne vrednosti:</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div style={{ padding: '10px', background: 'white', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <strong style={{ color: '#ff6f61' }}>Kalorije:</strong><br />
                  <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                    {formatNutritionValue(calculated.nutrition.calorie)} kcal
                  </span>
                </div>
                <div style={{ padding: '10px', background: 'white', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <strong style={{ color: '#ff6f61' }}>Beljakovine:</strong><br />
                  <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                    {formatNutritionValue(calculated.nutrition.proteinGram)} g
                  </span>
                </div>
                <div style={{ padding: '10px', background: 'white', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <strong style={{ color: '#ff6f61' }}>Ogljikovi hidrati:</strong><br />
                  <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                    {formatNutritionValue(calculated.nutrition.carbsGram)} g
                  </span>
                </div>
                <div style={{ padding: '10px', background: 'white', borderRadius: '4px', border: '1px solid #ddd' }}>
                  <strong style={{ color: '#ff6f61' }}>Maščobe:</strong><br />
                  <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
                    {formatNutritionValue(calculated.nutrition.fatGram)} g
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* DV% (Delež dnevne hranilne vrednosti) */}
          {calculated.dailyValuePercent && (
            <div>
              <h5 style={{ marginBottom: '10px', color: '#333' }}>Delež dnevne hranilne vrednosti (DV%):</h5>
              {!calculated.dailyValuePercent.caloriePercent && (
                <div style={{ 
                  padding: '10px', 
                  marginBottom: '15px', 
                  background: '#fff3cd', 
                  border: '1px solid #ffc107', 
                  borderRadius: '4px',
                  fontSize: '0.9em',
                  color: '#856404'
                }}>
                  💡 <strong>Namig:</strong> Vnesite vaš dnevni vnos kalorij zgoraj, da se izračuna DV% za kalorije.
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                {calculated.dailyValuePercent.caloriePercent !== null && calculated.dailyValuePercent.caloriePercent !== undefined && (
                  <div style={{ padding: '12px', background: 'white', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <strong style={{ color: '#ff6f61' }}>Kalorije:</strong><br />
                    <span style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#d9534f' }}>
                      {calculated.dailyValuePercent.caloriePercent}%
                    </span>
                    {dailyCalories && dailyCalories !== '' ? (
                      <div style={{ fontSize: '0.85em', color: '#666', marginTop: '5px' }}>
                        od {dailyCalories} kcal/dan
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.85em', color: '#999', marginTop: '5px', fontStyle: 'italic' }}>
                        (vnesite dnevni vnos kalorij)
                      </div>
                    )}
                  </div>
                )}
                {calculated.dailyValuePercent.proteinPercent !== null && calculated.dailyValuePercent.proteinPercent !== undefined && (
                  <div style={{ padding: '12px', background: 'white', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <strong style={{ color: '#ff6f61' }}>Beljakovine:</strong><br />
                    <span style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#d9534f' }}>
                      {calculated.dailyValuePercent.proteinPercent}%
                    </span>
                    <div style={{ fontSize: '0.85em', color: '#666', marginTop: '5px' }}>
                      od 50 g/dan (standard)
                    </div>
                  </div>
                )}
                {calculated.dailyValuePercent.carbsPercent !== null && calculated.dailyValuePercent.carbsPercent !== undefined && (
                  <div style={{ padding: '12px', background: 'white', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <strong style={{ color: '#ff6f61' }}>Ogljikovi hidrati:</strong><br />
                    <span style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#d9534f' }}>
                      {calculated.dailyValuePercent.carbsPercent}%
                    </span>
                    <div style={{ fontSize: '0.85em', color: '#666', marginTop: '5px' }}>
                      od 260 g/dan (standard)
                    </div>
                  </div>
                )}
                {calculated.dailyValuePercent.fatPercent !== null && calculated.dailyValuePercent.fatPercent !== undefined && (
                  <div style={{ padding: '12px', background: 'white', borderRadius: '4px', border: '1px solid #ddd' }}>
                    <strong style={{ color: '#ff6f61' }}>Maščobe:</strong><br />
                    <span style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#d9534f' }}>
                      {calculated.dailyValuePercent.fatPercent}%
                    </span>
                    <div style={{ fontSize: '0.85em', color: '#666', marginTop: '5px' }}>
                      od 70 g/dan (standard)
                    </div>
                  </div>
                )}
              </div>
              <div style={{ marginTop: '15px', padding: '10px', background: '#f9f9f9', borderRadius: '4px', fontSize: '0.85em', color: '#666' }}>
                <strong>Razlaga:</strong><br />
                {dailyCalories && dailyCalories !== '' ? (
                  <span>
                    • DV% za <strong>kalorije</strong> je izračunan na podlagi vašega dnevnega vnosa ({dailyCalories} kcal).<br />
                  </span>
                ) : (
                  <span>
                    • Za izračun DV% za <strong>kalorije</strong> vnesite vaš dnevni vnos kalorij zgoraj.<br />
                  </span>
                )}
                • DV% za <strong>beljakovine</strong> (50 g/dan), <strong>maščobe</strong> (70 g/dan) in <strong>ogljikove hidrate</strong> (260 g/dan) so izračunani na podlagi standardnih dnevnih vrednosti.
              </div>
            </div>
          )}
        </div>
      )}

      <hr />
      <Link to="/">← Back to all recipes</Link>
    </div>
  );
};

export default RecipeDetail;
