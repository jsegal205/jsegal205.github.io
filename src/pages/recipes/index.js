import React, { useState, useEffect } from "react";
import "../../App.css";

import { Link } from "react-router-dom";
import axios from "axios";

const Recipes = () => {
  const [recipes, setRecipes] = useState();
  useEffect(() => {
    axios.get("https://api.jimsegal.com/recipes").then(({ data }) => {
      setRecipes(data);
    });
  }, []);

  return recipes ? (
    <section>
      <h1>Recipes</h1>
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
    </section>
  ) : (
    <section>Loading...</section>
  );
};

export default Recipes;
