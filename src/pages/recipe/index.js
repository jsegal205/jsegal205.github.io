import React from "react";
import ReactMarkdown from "react-markdown";
import "../../App.css";

import { useParams } from "react-router-dom";

const data = {
  title: "jimtitle",
  slug: "jimslug",
  ingredients: "- 1 scoop of thing\n- 1/2 teaspoon of love",
  directions: "1. preheat oven to 325\n1. mix things\n",
  referenceUrl: "http://example.com"
};

const Recipe = () => {
  const { recipeSlug } = useParams();

  return (
    <main>
      <section>
        <h1>{data.title}</h1>
        <small>
          <a href={data.referenceUrl}>Original Reference</a>
        </small>
      </section>
      <div>
        <h2>Ingredients</h2>
        <ReactMarkdown source={data.ingredients} />
      </div>
      <div>
        <h2>Directions</h2>
        <ReactMarkdown source={data.directions} />
      </div>
      <hr />
      Do something with this crap:
      <div>routeSlug - {recipeSlug}</div>
      <div>slug - {data.slug}</div>
    </main>
  );
};

export default Recipe;
