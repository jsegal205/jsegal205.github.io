import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";

import useFetch from "../../utils/useFetch";
import Recipes from "./index";

jest.mock("../../utils/useFetch", () => jest.fn());

describe("Recipes Component", () => {
  describe("when `useFetch` is awaiting promise to resolve", () => {
    it("displays `Loading...`", () => {
      useFetch.mockReturnValue({
        loading: true,
        data: []
      });

      const tree = renderer.create(
        <Router>
          <Recipes />
        </Router>
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when `useFetch` returns data", () => {
    it("displays data", () => {
      useFetch.mockReturnValue({
        loading: false,
        data: [
          {
            title: "title",
            slug: "slug",
            referenceLink: "referenceLink",
            ingredients: "ingredients",
            directions: "directions",
            notes: "notes"
          },
          {
            title: "title2",
            slug: "slug2",
            referenceLink: "referenceLink2",
            ingredients: "ingredients2",
            directions: "directions2",
            notes: "notes2"
          }
        ]
      });

      const tree = renderer.create(
        <Router>
          <Recipes />
        </Router>
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
