import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";
import "../../App.css";
import "./recipes.css";

const Recipes = () => {
  const { loading, data: recipes } = useFetch(`${apiUrlBase}/recipes`);

  const [recipeSearch, setRecipeSearch] = useState("");
  const handleSearchChange = event => {
    setRecipeSearch(event.target.value);
  };
  const handleResetClick = () => {
    setRecipeSearch("");
  };

  const [recipeList, setRecipeList] = useState(recipes || []);
  useEffect(() => {
    if (!loading) {
      const results = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(recipeSearch.toLowerCase())
      );
      setRecipeList(results);
    }
  }, [loading, recipes, recipeSearch]);

  return (
    <section>
      <h2>Recipes</h2>
      {loading && <section>Loading...</section>}
      {recipes && recipes.length && (
        <>
          <section className="recipes-filter-container">
            <label htmlFor="recipes-filter">Search</label>
            <input
              type="text"
              id="recipes-filter"
              className="recipes-filter-input"
              value={recipeSearch}
              onChange={handleSearchChange}
            />
            {recipeSearch && (
              <button
                className="recipes-filter-reset"
                onClick={handleResetClick}
              >
                reset
              </button>
            )}
          </section>
          {recipeList.length ? (
            <ul>
              {recipeList.map(recipe => (
                <li key={recipe.slug}>
                  <Link
                    to={{
                      pathname: `/recipe/${recipe.slug}`,
                      state: { ...recipe }
                    }}
                  >
                    {recipe.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="recipes-no-results">
              No results for{" "}
              <strong>
                <em>{recipeSearch}</em>
              </strong>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Recipes;
