import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import withTracker from "./GoogleAnalyticsTracker";

import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";
import SpaceX from "./pages/spacex";
import NotFound from "./pages/not-found";
import Congress from "./pages/congress";
import CongressMembers from "./pages/congress/members";
import CongressMember from "./pages/congress/member";
import TopNav from "./components/topnav";
import Home from "./pages/home";
import Shorts from "./pages/shorts";
import MountainGoat from "./pages/mountian-goat";
import DogeTracker from "./pages/dogetracker";

const App = () => {
  return (
    <>
      <Router>
        <header>
          <h1 className="app-header">Jim Segal Projects</h1>
          <TopNav />
        </header>
        <article>
          <Switch>
            <Route exact path="/" component={withTracker(Home)} />
            <Route
              path="/congress/:chamber/members"
              component={withTracker(CongressMembers)}
            />
            <Route
              path="/congress/:chamber/member/:id"
              component={withTracker(CongressMember)}
            />
            <Route path="/congress" component={withTracker(Congress)} />
            <Route path="/dogetracker" component={withTracker(DogeTracker)} />
            <Route path="/isJimWearingShorts" component={withTracker(Shorts)} />
            <Route path="/mountaingoat" component={withTracker(MountainGoat)} />
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
