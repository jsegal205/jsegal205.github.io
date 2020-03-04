import React from "react";
import { render, cleanup } from "@testing-library/react";
import Recipes from "./index";

afterEach(cleanup);

it("renders correctly", () => {
  const { asFragment } = render(<Recipes />);
  expect(asFragment()).toMatchSnapshot();
});
