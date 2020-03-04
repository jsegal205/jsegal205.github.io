import React from "react";
import { render, cleanup } from "@testing-library/react";
import Home from "./index";

afterEach(cleanup);

it("renders correctly", () => {
  const { asFragment } = render(<Home />);
  expect(asFragment()).toMatchSnapshot();
});
