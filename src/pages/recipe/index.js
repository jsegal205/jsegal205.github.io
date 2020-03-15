import React, { useState, useEffect } from "react";
import { apiUrlBase } from "../../utils";

import ReactMarkdown from "react-markdown";
import axios from "axios";

import "../../App.css";
import "./recipe.css";
import NotFound from "../not-found";

const getSlug = ({ pathname, state }) => {
  if (state && state.slug) {
    // came from /recipes
    return state.slug;
  }

  // didn't come from /recipes
  const pathNameSplit = pathname.split("/");
  return pathNameSplit[pathNameSplit.length - 1];
};

const Recipe = props => {
  const [recipe, setRecipe] = useState();
  const slug = getSlug(props.location);

  useEffect(() => {
    axios
      .get(`${apiUrlBase}/recipe/${slug}`)
      .then(({ data }) => {
        setRecipe(data);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          setRecipe({ status: response.status });
        }
      });
  }, [slug]);

  if (!recipe) {
    return <section>Loading...</section>;
  }

  if (recipe.status === 404) {
    return <NotFound />;
  }

  const { title, referenceLink, ingredients, directions } = recipe;

  return (
    <section>
      <h2>{title}</h2>
      <small>
        <a href={referenceLink} target="_blank" rel="noopener noreferrer">
          Original Reference
        </a>
      </small>
      <h3>Ingredients</h3>
      <div className="ingredients">
        <ReactMarkdown source={ingredients} />
      </div>
      <h3>Directions</h3>
      <div className="directions">
        <ReactMarkdown source={directions} />
      </div>
    </section>
  );
};

export default Recipe;
