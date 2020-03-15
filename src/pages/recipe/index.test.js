import React from "react";
import { act, render, cleanup } from "@testing-library/react";
import Recipe from "./index";

afterEach(cleanup);

describe("Recipe Component", () => {
  describe("when props do not contain `state`", () => {
    it("displays text `Loading...` while fetching data", async () => {
      await act(async () => {
        const props = {
          location: {
            pathname: "/does/not/exist"
          }
        };
        const { getByText } = render(<Recipe {...props} />);

        getByText("Loading...");
      });
    });
  });

  // describe("when props contain `state`", () => {
  //   it("renders correctly", () => {
  //     const props = {
  //       location: {
  //         state: {
  //           title: "title",
  //           slug: "slug",
  //           referenceLink: "referenceLink",
  //           ingredients: "ingredients",
  //           directions: "directions"
  //         }
  //       }
  //     };
  //     const { asFragment } = render(<Recipe {...props} />);
  //     expect(asFragment()).toMatchSnapshot();
  //   });
  // });
});
