import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ShoppingList from './components/ShoppingList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import SearchBox from './components/SearchBox';
import IngredientList from './components/IngredientList';
import IngredientForm from './components/IngredientForm';
import RecipeIngredients from './components/RecipeIngredients';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import './index.css';
import './components/css/RecipeList.css';
import './components/css/Header.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [editRecipe, setEditRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [user, setUser] = useState(null);

  const API_URL = 'http://localhost:8080/api/recipes';
  const INGREDIENTS_API_URL = 'http://localhost:8080/api/ingredients';

  const fetchRecipes = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setRecipes(data);
  };

  const fetchIngredients = async () => {
    const res = await fetch(INGREDIENTS_API_URL);
    const data = await res.json();
    setIngredients(data);
  };

  // Učitaj user info iz localStorage pri pokretanju
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    if (token && username) {
      setUser({
        userId: userId,
        username: username,
        role: role,
        token: token
      });
    }

    fetchRecipes();
    fetchIngredients();
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

    // Ingredients handlers
    const handleIngredientSave = async (ingredient) => {
        await fetch(INGREDIENTS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ingredient),
        });
        fetchIngredients();
    };

    const handleIngredientDelete = async (id) => {
        await fetch(`${INGREDIENTS_API_URL}/${id}`, { method: 'DELETE' });
        fetchIngredients();
    };

  // Auth handlers
  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="container">
        <Header user={user} onLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="form-search-layout">
                  <div className="form-section">
                    <RecipeForm
                      onSave={handleSave}
                      editData={editRecipe}
                      onCancel={handleCancel}
                    />
                  </div>

                  <div className="divider"></div>

                  <div className="search-section">
                    <SearchBox
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                        fetchRecipes={fetchRecipes}
                        handleFilter={handleFilter}
                    />
                  </div>
                </div>

                <RecipeList
                  recipes={recipes}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </>
            }
          />
          <Route 
            path="/ingredients" 
            element={
              <>
                <IngredientForm onSave={handleIngredientSave} />
                <IngredientList 
                  ingredients={ingredients} 
                  onDelete={handleIngredientDelete} 
                />
              </>
            } 
          />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/recipe/:id/ingredients" element={<RecipeIngredients />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// za nekoj koj sho poima nema sho se node, java, detalni instrukcii da moze da go nameste proekto
// od github kloniraj repozitorij??
// public repozitorij 