import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import Home from "./index";

afterEach(cleanup);

describe("Home Component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Router>
        <Home />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
