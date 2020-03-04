import React from "react";
import { render, cleanup, shallowMount } from "@testing-library/react";
import Recipe from "./index";
import NotFound from "../not-found";

afterEach(cleanup);

describe("Recipe Component", () => {
  describe("when props do not contain `state`", () => {
    it("renders NotFound component", () => {
      const props = {
        location: {}
      };
      const { getByText } = render(<Recipe {...props} />);

      getByText("Not Found");
    });
  });

  describe("when props contain `state`", () => {
    it("renders correctly", () => {
      const props = {
        location: {
          state: {
            title: "title",
            referenceLink: "referenceLink",
            ingredients: "ingredients",
            directions: "directions"
          }
        }
      };
      const { asFragment } = render(<Recipe {...props} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
