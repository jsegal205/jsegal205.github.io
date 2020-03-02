import React from "react";
import ReactMarkdown from "react-markdown";
import "../../App.css";
import NotFound from "../not-found";

const Recipe = props => {
  const { state } = props.location;
  if (!state) {
    return <NotFound />;
  }

  const { title, referenceUrl, ingredients, directions } = state;

  return (
    <main>
      <section>
        <h1>{title}</h1>
        <small>
          <a href={referenceUrl}>Original Reference</a>
        </small>
      </section>
      <div>
        <h2>Ingredients</h2>
        <ReactMarkdown source={ingredients} />
      </div>
      <div>
        <h2>Directions</h2>
        <ReactMarkdown source={directions} />
      </div>
    </main>
  );
};

export default Recipe;
