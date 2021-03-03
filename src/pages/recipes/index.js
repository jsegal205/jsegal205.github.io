import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { adminUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";
import Error from "../../components/error";

import "../../App.css";
import "./recipes.css";
import Loading from "../../components/loading";
import SearchFilter from "../../components/search-filter";

const Recipes = () => {
  const { loading, data: recipes } = useFetch(`${adminUrlBase}/recipes`);

  const [recipeSearch, setRecipeSearch] = useState("");
  const handleSearchChange = (event) => {
    setRecipeSearch(event.target.value);
  };
  const handleResetClick = () => {
    setRecipeSearch("");
  };

  const [recipeList, setRecipeList] = useState([]);
  useEffect(() => {
    if (!loading && recipes) {
      if (recipes.error) {
        setRecipeList([]);
        return;
      }

      const results = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(recipeSearch.toLowerCase())
      );
      setRecipeList(results);
    }
  }, [loading, recipes, recipeSearch]);

  return (
    <section>
      <h2>Recipes</h2>
      {loading && <Loading />}
      {recipes && recipes.error && <Error componentName="Recipes" />}
      {recipes && recipes.length && (
        <>
          <SearchFilter
            searchValue={recipeSearch}
            handleResetClick={handleResetClick}
            handleSearchChange={handleSearchChange}
          />
          {recipeList.length ? (
            <ul className="recipes-list" data-testid="recipes-list">
              {recipeList.map((recipe) => (
                <li key={recipe.slug}>
                  <Link
                    to={{
                      pathname: `/recipe/${recipe.slug}`,
                      state: { ...recipe },
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
