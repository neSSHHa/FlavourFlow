import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams(); // vzame ID iz URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Duration:</strong> {recipe.durationMinutes} minutes</p>
      <Link to="/">← Back to all recipes</Link>
    </div>
  );
};

export default RecipeDetail;
