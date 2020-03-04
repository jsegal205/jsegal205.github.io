import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

it("renders correctly", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
