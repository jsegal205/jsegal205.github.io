import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import withTracker from "./GoogleAnalyticsTracker";

import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";
import SpaceX from "./pages/spacex";
import NotFound from "./pages/not-found";
import Congress from "./pages/congress";
import TopNav from "./components/topnav";
import Home from "./pages/home";

const App = () => {
  return (
    <>
      <div role="banner" className="vote-banner">
        Vote on November 3, 2020. More information at{" "}
        <a
          href="https://www.vote.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          vote.org
        </a>
      </div>
      <header>
        <h1 className="app-header">Jim Segal Projects</h1>
      </header>
      <Router>
        <article>
          <TopNav />
          <Switch>
            <Route exact path="/" component={withTracker(Home)} />
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
