import React from "react";
import { render, cleanup } from "@testing-library/react";
import NotFound from "./index";

afterEach(cleanup);

describe("NotFound Component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
  });
});
