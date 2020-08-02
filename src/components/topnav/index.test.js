import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";

import TopNav from "./index";

afterEach(cleanup);

describe("TopNav Component", () => {
  it("Does not render on root route", () => {
    const currentRoute = "/";
    const props = {
      location: {
        pathname: currentRoute,
      },
    };

    const { container } = render(
      <Router initialEntries={[currentRoute]}>
        <TopNav {...props} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  it("Renders on all other routes", () => {
    const currentRoute = "test";
    const props = {
      location: {
        pathname: currentRoute,
      },
    };

    const { container } = render(
      <Router initialEntries={[currentRoute]}>
        <TopNav {...props} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
