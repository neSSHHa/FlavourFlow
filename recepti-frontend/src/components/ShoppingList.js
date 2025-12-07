// src/ShoppingList.js
import React, { useEffect, useState, useMemo } from 'react';
import './css/RecipeList.css';

const API_BASE = 'http://localhost:8080/api';

const ShoppingList = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState({}); // { recipeId: [dto, ...] }
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 1) učitamo sve recepte
  useEffect(() => {
    fetch(`${API_BASE}/recipes`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error('Error fetching recipes', err));
  }, []);

  // 2) učitamo sačuvane izabrane recepte iz backend-a (ako je korisnik ulogovan)
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`${API_BASE}/shopping-list/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          const savedRecipeIds = data || [];
          setSelectedRecipeIds(savedRecipeIds);
          
          // Učitaj sastojke za sve sačuvane recepte
          if (savedRecipeIds.length > 0) {
            setLoading(true);
            Promise.all(
              savedRecipeIds.map(recipeId =>
                fetch(`${API_BASE}/recipes/${recipeId}/ingredients`)
                  .then(res => res.json())
                  .then(ingredients => ({ recipeId, ingredients }))
                  .catch(err => {
                    console.error(`Error fetching ingredients for recipe ${recipeId}`, err);
                    return { recipeId, ingredients: [] };
                  })
              )
            ).then(results => {
              const ingredientsMap = {};
              results.forEach(({ recipeId, ingredients }) => {
                ingredientsMap[recipeId] = ingredients;
              });
              setRecipeIngredients(ingredientsMap);
              setLoading(false);
            }).catch(err => {
              console.error('Error loading ingredients', err);
              setLoading(false);
            });
          }
        })
        .catch((err) => console.error('Error fetching shopping list', err));
    }
  }, []);

  // 3) sačuvaj shopping listu u backend
  const saveShoppingList = async (newSelectedIds) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.log('User not logged in, shopping list not saved');
      return;
    }

    setSaving(true);
    try {
      await fetch(`${API_BASE}/shopping-list/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSelectedIds),
      });
    } catch (err) {
      console.error('Error saving shopping list', err);
    } finally {
      setSaving(false);
    }
  };

  // 4) klik na recept (checkbox)
  const toggleRecipe = async (recipeId) => {
    const alreadySelected = selectedRecipeIds.includes(recipeId);
    let newSelectedIds;

    if (alreadySelected) {
      // skini recept sa liste
      newSelectedIds = selectedRecipeIds.filter((id) => id !== recipeId);
    } else {
      // dodaj recept na listu
      newSelectedIds = [...selectedRecipeIds, recipeId];

      // ako prvi put biramo ovaj recept i nemamo mu još sastojine → fetch
      if (!recipeIngredients[recipeId]) {
        setLoading(true);
        try {
          const res = await fetch(`${API_BASE}/recipes/${recipeId}/ingredients`);
          const data = await res.json();
          setRecipeIngredients((prev) => ({
            ...prev,
            [recipeId]: data,
          }));
        } catch (err) {
          console.error('Error fetching ingredients for recipe', recipeId, err);
        } finally {
          setLoading(false);
        }
      }
    }

    // ažuriraj state i sačuvaj u backend
    setSelectedRecipeIds(newSelectedIds);
    saveShoppingList(newSelectedIds);
  };

  // 5) saberi gramaze za sve izabrane recepte
  const aggregatedIngredients = useMemo(() => {
    const totals = {}; // { ingredientId: { id, title, totalGrams } }

    selectedRecipeIds.forEach((recipeId) => {
      const ingList = recipeIngredients[recipeId] || [];

      ingList.forEach((dto) => {
        // backend DTO: { id, title, selected, kolicinaGram }
        if (!dto.selected || dto.kolicinaGram == null) return;

        const key = dto.id;
        if (!totals[key]) {
          totals[key] = {
            id: dto.id,
            title: dto.title,
            totalGrams: 0,
          };
        }
        totals[key].totalGrams += dto.kolicinaGram;
      });
    });

    return Object.values(totals);
  }, [selectedRecipeIds, recipeIngredients]);

  // 6) export dugme – zasad samo prikaz
  const handleExport = () => {
    if (aggregatedIngredients.length === 0) {
      alert('Najpre izaberi bar jedan recept.');
      return;
    }

    console.log('Nakupovalni seznam:', aggregatedIngredients);
    alert('Export (samo frontend) – sadržaj je ispisan u konzoli.');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Nakupovalni seznam</h2>

      {loading && <p>Loading...</p>}
      {saving && <p style={{ color: '#666' }}>Saving...</p>}

      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginTop: '20px',
          alignItems: 'flex-start',
        }}
      >
        {/* LEVA STRANA – recepti */}
        <div className="recipe-list" style={{ flex: 1 }}>
          <h2>Recepti</h2>

          {recipes.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
              Ni enega recepta.
            </p>
          ) : (
            recipes.map((r) => {
              const isSelected = selectedRecipeIds.includes(r.id);
              const ingList = recipeIngredients[r.id] || [];

              return (
                <div key={r.id} className="recipe-card">
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '6px',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRecipe(r.id)}
                    />
                    <h3 className="recipe-title" style={{ margin: 0 }}>
                      {r.title}
                    </h3>
                  </label>

                  {/* Sastojine za ovaj recept */}
                  {ingList.length > 0 && (
                    <ul style={{ marginLeft: '20px', marginTop: '4px' }}>
                      {ingList
                        .filter((dto) => dto.selected && dto.kolicinaGram != null)
                        .map((dto) => (
                          <li key={dto.id}>
                            {dto.title} – {dto.kolicinaGram} g
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* DESNA STRANA – zbirni shopping list */}
        <div className="recipe-list" style={{ flex: 1 }}>
          <h2>Skupaj za nakup</h2>

          {aggregatedIngredients.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
              Ni izbranih receptov.
            </p>
          ) : (
            aggregatedIngredients.map((item) => (
              <div key={item.id} className="recipe-card">
                <h3 style={{ color: '#ff6f61', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p>
                  <strong>{item.totalGrams} g</strong>
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* EXPORT DUGME */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={handleExport}
          disabled={aggregatedIngredients.length === 0}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: aggregatedIngredients.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default ShoppingList;
