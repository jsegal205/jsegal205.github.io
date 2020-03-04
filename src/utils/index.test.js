// import React from "react";
// import { render, cleanup } from "@testing-library/react";
import { apiUrlBase } from "./index";

// afterEach(cleanup);

it("renders correctly", () => {
  // const { asFragment } = render(<NotFound />);
  expect(apiUrlBase).toEqual("https://api.jimsegal.com");
});
