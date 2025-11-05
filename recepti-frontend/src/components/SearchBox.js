import React from 'react';
import { useLocation } from 'react-router-dom';
import '../index.css';

function SearchBox({ searchTerm, setSearchTerm, handleSearch, fetchRecipes, handleFilter }) {
  const location = useLocation();

  if (location.pathname !== '/') return null;

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="search-filter-wrapper">
      {/* search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search by title..."
          value={searchTerm}
          onChange={handleChange}
        />

        {searchTerm && (
          <button
            className="reset-btn"
            onClick={() => {
              setSearchTerm('');
              fetchRecipes();
            }}
          >
            Reset
          </button>
        )}
      </div>

      {/* filter */}
      <div className="filter-box">
        <label htmlFor="durationFilter" className="filter-label">
          Filter by duration:
        </label>
        <select
          id="durationFilter"
          onChange={(e) => handleFilter(e.target.value)}
          defaultValue="all"
        >
          <option value="all">All</option>
          <option value="short">Under 30 min</option>
          <option value="long">30 min or more</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBox;
