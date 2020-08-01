import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import useFetch from "../../utils/useFetch";
import Congress from "./index";
import { render } from "@testing-library/react";
import { toMatchDiffSnapshot } from "snapshot-diff";

expect.extend({ toMatchDiffSnapshot });

jest.mock("../../utils/useFetch", () => jest.fn());

const returnData = {
  session: 116,
  house: {
    age: {
      average: {
        all: 58.52,
        democrat: 59.39,
        female: 58.93,
        male: 58.4,
        republican: 57.62,
      },
      distribution: {
        "50": {
          total: 0,
          D: 0,
          R: 0,
          M: 0,
          F: 0,
        },
      },
      oldest: {
        age: 87,
        date_of_birth: "1933-06-09",
        full_name: "Don Young",
        gender: "M",
        party: "R",
        state: "AK",
      },
      youngest: {
        age: 30,
        date_of_birth: "1989-10-13",
        full_name: "Alexandria Ocasio-Cortez",
        gender: "F",
        party: "D",
        state: "NY",
      },
    },
    gender: {
      total: 449,
      men: 343,
      percentMen: 76.39,
      percentWomen: 23.61,
      women: 106,
    },
    party: {
      D: {
        total: 239,
        men: 148,
        percentMen: 61.92,
        percentWomen: 38.08,
        women: 91,
      },
      R: {
        total: 209,
        men: 194,
        percentMen: 92.82,
        percentWomen: 7.18,
        women: 15,
      },
    },
  },
  senate: {
    age: {
      average: {
        all: 63.89,
        democrat: 63.87,
        female: 62.08,
        male: 64.52,
        republican: 63.43,
      },
      oldest: {
        age: 87,
        date_of_birth: "1933-06-22",
        full_name: "Dianne Feinstein",
        gender: "F",
        party: "D",
        state: "CA",
      },
      youngest: {
        age: 40,
        date_of_birth: "1979-12-31",
        full_name: "Joshua Hawley",
        gender: "M",
        party: "R",
        state: "MO",
      },
    },
    gender: {
      total: 101,
      men: 75,
      percentMen: 74.26,
      percentWomen: 25.74,
      women: 26,
    },
    party: {
      D: {
        total: 45,
        men: 28,
        percentMen: 62.22,
        percentWomen: 37.78,
        women: 17,
      },
      R: {
        total: 54,
        men: 45,
        percentMen: 83.33,
        percentWomen: 16.67,
        women: 9,
      },
    },
  },
};

describe("Recipes Component", () => {
  describe("when `useFetch` is awaiting promise to resolve", () => {
    it("displays `Loading...`", () => {
      useFetch.mockReturnValue({
        loading: true,
        data: null,
      });

      const { container } = render(
        <Router>
          <Congress />
        </Router>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("when `useFetch` returns data", () => {
    it("displays data", () => {
      useFetch.mockReturnValue({
        loading: false,
        data: returnData,
      });

      const { container } = render(
        <Router>
          <Congress />
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
            <Congress />
          </Router>
        );
        expect(container).toMatchSnapshot();
      });
    });
  });
});
