import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import useFetch from "../../utils/useFetch";
import SpaceX from "./index";
import { render } from "@testing-library/react";
import { toMatchDiffSnapshot } from "snapshot-diff";

expect.extend({ toMatchDiffSnapshot });

jest.mock("../../utils/useFetch", () => jest.fn());

describe("SpaceX Component", () => {
  describe("when `useFetch` is awaiting promise to resolve", () => {
    it("displays `Loading...`", () => {
      useFetch.mockReturnValue({
        loading: true,
        data: [],
      });

      const { container } = render(
        <Router>
          <SpaceX />
        </Router>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("when `useFetch` returns data", () => {
    it("displays data", () => {
      useFetch.mockReturnValue({
        loading: false,
        data: [
          {
            mission_name: "mission_name",
            details: "details",
            launch_date_utc: 1,
            rocket: { rocket_name: "rocket_name" },
            launch_site: { site_name_long: "site_name_long" },
          },
        ],
      });

      const { container } = render(
        <Router>
          <SpaceX />
        </Router>
      );
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
            <SpaceX />
          </Router>
        );
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
            <SpaceX />
          </Router>
        );
        expect(container).toMatchSnapshot();
      });
    });
  });
});
