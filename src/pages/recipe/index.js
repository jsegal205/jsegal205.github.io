import React from "react";
import "../../App.css";

import { useParams } from "react-router-dom";

const Recipe = () => {
  const { recipeSlug } = useParams();

  return <h1>Recipe SHOW - {recipeSlug}</h1>;
};

export default Recipe;
