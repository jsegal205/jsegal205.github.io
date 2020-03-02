import React, { useState, useEffect } from "react";
import "../../App.css";

import { Link } from "react-router-dom";
import axios from "axios";

// const data = [
//   {
//     title: "asdf",
//     slug: "asdf",
//     ingredients: "- 1 scoop of thing\n- 1/2 teaspoon of love",
//     directions: "1. preheat oven to 325\n1. mix things\n",
//     referenceUrl: "http://asdf.com"
//   },
//   {
//     title: "qwerty",
//     slug: "q-w-e-r-t-y",
//     ingredients: "- 2 scoop of thing\n- 4 teaspoons of hatred",
//     directions: "1. get out mixing bowl\n1. wang jangle\n",
//     referenceUrl: "http://qwerty.com"
//   },
//   {
//     title: "JESS' PB&J",
//     slug: "jess-pb-and-j",
//     ingredients: "- bread\n- peanut butter\n- unfortunately jelly",
//     directions:
//       "1. spread peanut butter liberally\n1. 1 teaspoon of jelly into the garbage\n1. put the two halves together\n1. eat",
//     referenceUrl: "http://pbj.com"
//   }
// ];

const Recipes = () => {
  const [recipes, setRecipes] = useState();
  useEffect(() => {
    axios.get("http://localhost:8001/recipes").then(({ data }) => {
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
