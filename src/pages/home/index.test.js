import React from "react";
import { render, cleanup } from "@testing-library/react";
import Home from "./index";

afterEach(cleanup);

describe("Home Component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});
