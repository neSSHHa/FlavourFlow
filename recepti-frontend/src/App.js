import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import SearchBox from './components/SearchBox';
import './index.css';
import './components/css/RecipeList.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editRecipe, setEditRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = 'http://localhost:8080/api/recipes';

  const fetchRecipes = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setRecipes(data);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSave = async (recipe) => {
    if (editRecipe) {
      await fetch(`${API_URL}/${editRecipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      });
      setEditRecipe(null);
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      });
    }
    fetchRecipes();
  };

    const handleEdit = (recipe) => setEditRecipe(recipe);

    const handleDelete = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchRecipes();
    };

    const handleCancel = () => setEditRecipe(null);

    const handleSearch = async (term) => {
        if (term.trim() === '') {
            fetchRecipes();
            return;
        }
            
        const res = await fetch(`${API_URL}/search?keyword=${encodeURIComponent(term)}`);
        const data = await res.json();
        setRecipes(data);
    };

    const handleFilter = async (type) => {
        if(type === 'all') {
            fetchRecipes();
            return;
        }
        const res = await fetch(`${API_URL}/filter?type=${type}`);
        const data = await res.json();
        setRecipes(data);
    }

  return (
    <Router>
      <div className="container">
        <h1>Flavor Flow</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <RecipeForm
                  onSave={handleSave}
                  editData={editRecipe}
                  onCancel={handleCancel}
                />

                <SearchBox
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch}
                    fetchRecipes={fetchRecipes}
                    handleFilter={handleFilter}
                />

                <RecipeList
                  recipes={recipes}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </>
            }
          />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// za nekoj koj sho poima nema sho se node, java, detalni instrukcii da moze da go nameste proekto
// od github kloniraj repozitorij??
// public repozitorij 