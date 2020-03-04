import React from "react";
import axios from "axios";
import {
  act,
  render,
  cleanup,
  waitForElementToBeRemoved
} from "@testing-library/react";
import Recipes from "./index";

const stubbedRecipes = [
  {
    title: "title",
    slug: "slug",
    referenceLink: "referenceLink",
    ingredients: "ingredients",
    directions: "directions"
  },
  {
    title: "title2",
    slug: "slug2",
    referenceLink: "referenceLink2",
    ingredients: "ingredients2",
    directions: "directions2"
  }
];

beforeEach(() => {
  axios.get = jest.fn(() =>
    Promise.resolve({
      data: []
    })
  );
});

afterEach(cleanup);

describe("Recipes Component", () => {
  it("displays text `Loading...` while fetching data", async () => {
    await act(async () => {
      const { getByText } = render(<Recipes />);

      getByText("Loading...");
    });
  });

  // it("removes text `Loading...` after displaying recipes", async () => {

  //   await act(async () => {
  //     const { getByText } = render(<Recipes />);

  //     await waitForElementToBeRemoved(() => getByText("Loading..."));
  //   });
  // });
});
