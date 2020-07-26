import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import withTracker from "./GoogleAnalyticsTracker";

import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";
import SpaceX from "./pages/spacex";
import NotFound from "./pages/not-found";
import Congress from "./pages/congress";

const App = () => {
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
                <Link to="/congress">Congress</Link>
              </li>
              <li>
                <Link to="/recipes">Recipes</Link>
              </li>
              <li>
                <Link to="/spacex">Space X</Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path="/" component={withTracker(Recipes)} />
            <Route path="/congress" component={withTracker(Congress)} />
            <Route path="/recipes" component={withTracker(Recipes)} />
            <Route path="/recipe/:recipeSlug" component={withTracker(Recipe)} />
            <Route path="/spacex" component={withTracker(SpaceX)} />
            <Route path="*" component={withTracker(NotFound)} />
          </Switch>
        </article>
      </Router>
    </>
  );
};
export default App;
