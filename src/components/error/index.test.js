import React from "react";
import { render, cleanup } from "@testing-library/react";
import Error from "./index";

afterEach(cleanup);

describe("Error Component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Error />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("with prop renders correctly", () => {
    const { asFragment } = render(<Error componentName="ERROR" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
