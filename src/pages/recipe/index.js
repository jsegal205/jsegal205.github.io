import React from "react";
import { apiUrlBase } from "../../utils";

import ReactMarkdown from "react-markdown";

import "../../App.css";
import "./recipe.css";
import NotFound from "../not-found";
import useFetch from "../../utils/useFetch";

const getSlug = ({ pathname, state }) => {
  if (state && state.slug) {
    // came from /recipes
    return state.slug;
  }

  // didn't come from /recipes
  const pathNameSplit = pathname.split("/");
  return pathNameSplit[pathNameSplit.length - 1];
};

const Recipe = (props) => {
  const slug = getSlug(props.location);
  const { loading, data: recipe } = useFetch(`${apiUrlBase}/recipe/${slug}`);

  if (loading) {
    return <section>Loading...</section>;
  }

  if (recipe.status === 404) {
    return <NotFound />;
  }

  if (recipe.error) {
    return (
      <section>
        <h3>Whoops! There was a problem loading Recipe.</h3>
        <p>Please reload browser to try again in a little bit.</p>
      </section>
    );
  }

  const { title, referenceLink, ingredients, directions, notes } = recipe;

  return (
    <section>
      <h2>{title}</h2>
      {referenceLink && (
        <small>
          <a href={referenceLink} target="_blank" rel="noopener noreferrer">
            Original Reference
          </a>
        </small>
      )}
      <h3>Ingredients</h3>
      <div className="ingredients">
        <ReactMarkdown source={ingredients} />
      </div>
      <h3>Directions</h3>
      <div className="directions">
        <ReactMarkdown source={directions} />
      </div>
      {notes && [
        <h3 key="notes-header">Notes</h3>,
        <div key="notes-desc">
          <ReactMarkdown source={notes} />
        </div>,
      ]}
    </section>
  );
};

export default Recipe;
