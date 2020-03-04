import React from "react";
import { render, cleanup } from "@testing-library/react";
import Recipe from "./index";

afterEach(cleanup);

it("renders correctly", () => {
  const { asFragment } = render(<Recipe />);
  expect(asFragment()).toMatchSnapshot();
});
