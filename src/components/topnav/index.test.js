import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { render, cleanup } from "@testing-library/react";
import TopNav from "./index";

afterEach(cleanup);

describe("TopNav Component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Router>
        <TopNav />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
