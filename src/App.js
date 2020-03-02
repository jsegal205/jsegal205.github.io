import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <main>
      <h1>Jim Segal Projects</h1>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/recipes">Recipes</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/recipes">
              <Recipes />
            </Route>
            <Route path="/recipe/:recipeSlug">
              <Recipe />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </main>
  );
}
