import React from "react";
import { render, cleanup } from "@testing-library/react";
import SearchFilter from "./index";

afterEach(cleanup);

describe("Loading Component", () => {
  it("renders default state correctly", () => {
    const { asFragment } = render(<SearchFilter />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe("when `searchValue` is passed", () => {
    it("renders reset button", () => {
      const { asFragment } = render(
        <SearchFilter searchValue="test" handleSearchChange={() => {}} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
