import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <>
      <header>
        <h1>Jim Segal Projects</h1>
      </header>
      <Router>
        <article>
          <nav>
            <ul>
              <li>
                <Link to="/recipes">All Recipes</Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path="/" component={Recipes} />
            <Route path="/recipes" component={Recipes} />
            <Route path="/recipe/:recipeSlug" component={Recipe} />
            <Route path="*" component={NotFound} />
          </Switch>
        </article>
      </Router>
    </>
  );
}
