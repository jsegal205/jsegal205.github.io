import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import useFetch from "../../utils/useFetch";
import Recipes from "./index";
import { adminUrlBase } from "../../utils";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { toMatchDiffSnapshot } from "snapshot-diff";

expect.extend({ toMatchDiffSnapshot });

jest.mock("../../utils/useFetch", () => jest.fn());

describe("Recipes Component", () => {
  const baseUrl = `${adminUrlBase}/recipes`;

  describe("when `useFetch` is awaiting promise to resolve", () => {
    it("displays `Loading...`", () => {
      useFetch.mockReturnValue({
        loading: true,
        data: [],
      });

      const { container } = render(
        <Router>
          <Recipes />
        </Router>
      );
      expect(useFetch).toHaveBeenCalledWith(baseUrl);
      expect(container).toMatchSnapshot();
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
            notes: "notes",
          },
          {
            title: "title2",
            slug: "slug2",
            referenceLink: "referenceLink2",
            ingredients: "ingredients2",
            directions: "directions2",
            notes: "notes2",
          },
        ],
      });

      const { container } = render(
        <Router>
          <Recipes />
        </Router>
      );
      expect(useFetch).toHaveBeenCalledWith(baseUrl);
      expect(container).toMatchSnapshot();
    });

    describe("when no data returned", () => {
      it("displays no data", () => {
        useFetch.mockReturnValue({
          loading: false,
          data: [],
        });

        const { container } = render(
          <Router>
            <Recipes />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(baseUrl);
        expect(container).toMatchSnapshot();
      });
    });

    describe("when 500 status returned", () => {
      it("displays error messaging", () => {
        useFetch.mockReturnValue({
          loading: false,
          data: {
            error: "server likely on fire",
            status: 500,
          },
        });

        const { container } = render(
          <Router>
            <Recipes />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(baseUrl);
        expect(container).toMatchSnapshot();
      });
    });
  });

  describe("Search filtering", () => {
    const apiData = [
      {
        title: "abc",
        slug: "abc",
      },
      {
        title: "xyz",
        slug: "xyz",
      },
    ];
    const setup = () => {
      useFetch.mockReturnValue({
        loading: false,
        data: apiData,
      });

      return render(
        <Router>
          <Recipes />
        </Router>
      );
    };

    it("defaults search input to empty string", () => {
      const { container } = setup();
      const recipeFilter = getByTestId(container, "search-filter");
      const recipesList = getByTestId(container, "recipes-list");
      const recipesListItems = recipesList.querySelectorAll("li");

      expect(recipeFilter.value).toBe("");
      expect(recipesListItems.length).toEqual(apiData.length);
      expect(recipesListItems[0].querySelector("a").innerHTML).toEqual(
        apiData[0].title
      );
      expect(recipesListItems[1].querySelector("a").innerHTML).toEqual(
        apiData[1].title
      );
    });

    describe("when input matches subset of the data", () => {
      it("only shows data to match", () => {
        const { container, asFragment } = setup();

        const initialRender = asFragment();
        const recipeFilter = getByTestId(container, "search-filter");
        fireEvent.change(recipeFilter, { target: { value: "a" } });

        expect(initialRender).toMatchDiffSnapshot(asFragment());
      });
    });

    describe("when input matches none of the data", () => {
      it("only shows data to match", () => {
        const { container, asFragment } = setup();

        const initialRender = asFragment();
        const recipeFilter = getByTestId(container, "search-filter");
        fireEvent.change(recipeFilter, { target: { value: "mno" } });

        expect(initialRender).toMatchDiffSnapshot(asFragment());
      });
    });

    describe("when reset clicked", () => {
      it("resets search input value", () => {
        const { container } = setup();

        const recipeFilter = getByTestId(container, "search-filter");
        fireEvent.change(recipeFilter, { target: { value: "a" } });

        expect(recipeFilter.value).toBe("a");

        const recipeFilterReset = getByTestId(container, "search-filter-reset");

        fireEvent.click(recipeFilterReset);
        expect(recipeFilter.value).toBe("");
      });
    });
  });
});
