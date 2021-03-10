import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import useFetch from "../../utils/useFetch";
import DogeTracker from "./index";
import { render } from "@testing-library/react";

jest.mock("../../utils/useFetch", () => jest.fn());

describe("DogeTracker Component", () => {
  describe("when `useFetch` is awaiting promise to resolve", () => {
    it("displays `Loading...`", () => {
      useFetch.mockReturnValue({
        loading: true,
        data: null,
      });

      const { container } = render(
        <Router>
          <DogeTracker />
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
          market_data: {
            current_price: {
              usd: 100,
              btc: 1,
            },
          },
        },
      });

      const { container } = render(
        <Router>
          <DogeTracker />
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
            <DogeTracker />
          </Router>
        );
        expect(container).toMatchSnapshot();
      });
    });
  });
});
