import React from "react";
import { render, cleanup } from "@testing-library/react";
import Loading from "./index";

afterEach(cleanup);

describe("Loading Component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
