import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "./App";

import { complementaryColor, randomHexColor, textColor } from "./utils/color";

afterEach(cleanup);

jest.mock("./utils/color", () => {
  return {
    complementaryColor: jest.fn(),
    randomHexColor: jest.fn(),
    textColor: jest.fn(),
  };
});

it("renders correctly", () => {
  complementaryColor.mockReturnValue("000000");
  randomHexColor.mockReturnValue("ffffff");
  textColor.mockReturnValue("444444");

  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
