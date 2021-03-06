import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import useFetch from "../../utils/useFetch";
import SpaceX from "./index";
import { act, render } from "@testing-library/react";
import { toMatchDiffSnapshot } from "snapshot-diff";

expect.extend({ toMatchDiffSnapshot });

jest.mock("../../utils/useFetch", () => jest.fn());

describe("SpaceX Component", () => {
  describe("when `useFetch` is awaiting promise to resolve", () => {
    it("displays `Loading...`", () => {
      useFetch.mockReturnValue({
        loading: true,
        data: {},
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
    beforeEach(() => {
      const mockDate = new Date("01-01-2020");
      global.Date.now = jest.fn(() => mockDate);
    });

    it("displays data", () => {
      jest.useFakeTimers();
      useFetch.mockReturnValue({
        loading: false,
        data: {
          mission_name: "mission_name_future",
          details: "future details",
          date_unix: new Date("01-01-2021").valueOf() / 1000,
          date_utc: new Date("01-01-2021"),
          rocket_name: "rocket_name_future",
          launchpad: "site_name_long_future",
        },
      });

      const { container } = render(
        <Router>
          <SpaceX />
        </Router>
      );
      act(() => {
        jest.runAllTimers(); // trigger setTimeout
      });
      expect(container).toMatchSnapshot();
    });

    describe("when no data returned", () => {
      it("displays no data", () => {
        jest.useFakeTimers();
        useFetch.mockReturnValue({
          loading: false,
          data: {},
        });

        const { container } = render(
          <Router>
            <SpaceX />
          </Router>
        );
        act(() => {
          jest.runAllTimers(); // trigger setTimeout
        });
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
