import React from "react";
import "../../App.css";

import { Link } from "react-router-dom";
const Recipes = () => (
  <main>
    <h1>Recipe INDEX</h1>
    <ul>
      <li>
        <Link to="/recipe/asdf">asdf</Link>
      </li>
      <li>
        <Link to="/recipe/qwerty">qwerty</Link>
      </li>
      <li>
        <Link to="/recipe/zxcvbn">zxcvbn</Link>
      </li>
    </ul>
  </main>
);

export default Recipes;
