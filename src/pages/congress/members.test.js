import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";
import CongressMembers from "./members";

jest.mock("../../utils/useFetch", () => jest.fn());

describe("CongressMembers Component", () => {
  describe("when `useFetch` is awaiting promise to resolve", () => {
    it("displays `Loading...`", () => {
      const chamber = "doesNotExist";
      const props = {
        location: {
          pathname: `/cogress/${chamber}/members`,
        },
      };

      useFetch.mockReturnValue({
        loading: true,
        data: {},
      });

      const tree = renderer.create(
        <Router>
          <CongressMembers {...props} />
        </Router>
      );
      expect(useFetch).toHaveBeenCalledWith(
        `${apiUrlBase}/congress/${chamber}/members`
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when `useFetch` returns data", () => {
    describe("with 404 status", () => {
      it("displays `Not Found`", () => {
        const chamber = "doesNotExist";
        const props = {
          location: {
            pathname: `/cogress/${chamber}/members`,
          },
        };

        useFetch.mockReturnValue({
          loading: false,
          data: { status: 404 },
        });

        const tree = renderer.create(
          <Router>
            <CongressMembers {...props} />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(
          `${apiUrlBase}/congress/${chamber}/members`
        );
        expect(tree.toJSON()).toMatchSnapshot();
      });
    });

    describe("with 500 status", () => {
      it("displays error message", () => {
        const chamber = "house";
        const props = {
          location: {
            pathname: `/cogress/${chamber}/members`,
          },
        };

        useFetch.mockReturnValue({
          loading: false,
          data: { error: "server likely on fire", status: 500 },
        });

        const tree = renderer.create(
          <Router>
            <CongressMembers {...props} />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(
          `${apiUrlBase}/congress/${chamber}/members`
        );
        expect(tree.toJSON()).toMatchSnapshot();
      });
    });

    describe("with 200 status", () => {
      it("displays data", () => {
        const chamber = "house";
        const props = {
          location: {
            pathname: `/cogress/${chamber}/members`,
          },
        };

        useFetch.mockReturnValue({
          loading: false,
          data: {
            house: [
              {
                id: 1,
                first_name: "first",
                last_name: "last",
                party: "party",
                state: "state",
              },
            ],
            status: 200,
          },
        });

        const tree = renderer.create(
          <Router>
            <CongressMembers {...props} />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(
          `${apiUrlBase}/congress/${chamber}/members`
        );
        expect(tree.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe("getChamber", () => {
    describe("when props contain state.chamber", () => {
      it("pulls chamber from state", () => {
        const props = {
          location: {
            state: {
              chamber: "state-chamber",
            },
            pathname: `/cogress/house/members`,
          },
        };

        useFetch.mockReturnValue({
          loading: true,
          data: {},
        });

        renderer.create(
          <Router>
            <CongressMembers {...props} />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(
          `${apiUrlBase}/congress/state-chamber/members`
        );
      });
    });
    describe("when props do not contain state.chamber", () => {
      it("pulls slug from pathname", () => {
        const props = {
          location: {
            state: {
              "not-a-chamber": "state-chamber",
            },
            pathname: `/cogress/house/members`,
          },
        };

        useFetch.mockReturnValue({
          loading: true,
          data: {},
        });

        renderer.create(
          <Router>
            <CongressMembers {...props} />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(
          `${apiUrlBase}/congress/house/members`
        );
      });
    });
  });
});
