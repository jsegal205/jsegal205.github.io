import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import useFetch from "../../utils/useFetch";
import Shorts from "./index";
import { render } from "@testing-library/react";

jest.mock("../../utils/useFetch", () => jest.fn());

describe("Shorts Component", () => {
  describe("when `useFetch` is awaiting promise to resolve", () => {
    it("displays `Loading...`", () => {
      useFetch.mockReturnValue({
        loading: true,
        data: null,
      });

      const { container } = render(
        <Router>
          <Shorts />
        </Router>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("when `useFetch` returns data", () => {
    it("displays data", () => {
      useFetch.mockReturnValue({
        loading: false,
        data: {
          probability: 50,
          criteria: [{ label: "criteria 1", value: "value 1" }],
        },
      });

      const { container } = render(
        <Router>
          <Shorts />
        </Router>
      );
      expect(container).toMatchSnapshot();
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
            <Shorts />
          </Router>
        );
        expect(container).toMatchSnapshot();
      });
    });
  });
});
