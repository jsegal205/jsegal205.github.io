import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import Home from "./index";
import {
  complementaryColor,
  randomHexColor,
  textColor,
} from "../../utils/color";

afterEach(cleanup);

jest.mock("../../utils/color", () => {
  return {
    complementaryColor: jest.fn(),
    randomHexColor: jest.fn(),
    textColor: jest.fn(),
  };
});

describe("Home Component", () => {
  it("renders correctly", () => {
    complementaryColor.mockReturnValue("000000");
    randomHexColor.mockReturnValue("ffffff");
    textColor.mockReturnValue("444444");
    const { container } = render(
      <Router>
        <Home />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
