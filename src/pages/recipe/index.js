import React from "react";
import "../../App.css";

import { useParams } from "react-router-dom";

const data = {
  title: "jimtitle",
  slug: "jimslug",
  ingredients: "jimingredients",
  description: "jimdescription",
  referenceUrl: "http://example.com"
};

const Recipe = () => {
  const { recipeSlug } = useParams();

  return (
    <main>
      <section>
        <h1>title - {data.title}</h1>
        <small>
          <a href={data.referenceUrl}>Original Reference</a>
        </small>
      </section>
      <div>routeSlug - {recipeSlug}</div>
      <div>slug - {data.slug}</div>
      <div>ingredients - {data.ingredients}</div>
      <div>description - {data.description}</div>
    </main>
  );
};

export default Recipe;
