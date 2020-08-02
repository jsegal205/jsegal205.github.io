import React from "react";
import { Link } from "react-router-dom";

const nav = {
  Congress: "/congress",
  Recipes: "/recipes",
  "Space X": "/spacex",
};

const TopNav = () => (
  <nav>
    <ul>
      {Object.keys(nav).map((navKey) => (
        <li key={navKey}>
          <Link to={nav[navKey]}>{navKey}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default TopNav;
