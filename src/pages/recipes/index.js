import React from "react";
import { Link } from "react-router-dom";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";
import "../../App.css";

const Recipes = () => {
  const { loading, data: recipes } = useFetch(`${apiUrlBase}/recipes`);

  return (
    <section>
      <h2>Recipes</h2>
      {loading && <section>Loading...</section>}
      {recipes && recipes.length && (
        <ul>
          {recipes.map(recipe => (
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
      )}
    </section>
  );
};

export default Recipes;
