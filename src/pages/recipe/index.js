import React from "react";
import ReactMarkdown from "react-markdown";
import "../../App.css";
import NotFound from "../not-found";

const Recipe = props => {
  const { state } = props.location;
  if (!state) {
    // add endpoint for recipe SHOW, make call here if it's not set.
    return <NotFound />;
  }

  const { title, referenceLink, ingredients, directions } = state;

  return (
    <section>
      <div>
        <h2>{title}</h2>
        <small>
          <a href={referenceLink} target="_blank" rel="noopener noreferrer">
            Original Reference
          </a>
        </small>
      </div>
      <div>
        <h3>Ingredients</h3>
        <ReactMarkdown source={ingredients} />
      </div>
      <div>
        <h3>Directions</h3>
        <ReactMarkdown source={directions} />
      </div>
    </section>
  );
};

export default Recipe;
