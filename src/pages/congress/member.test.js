import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";
import Member from "./member";

jest.mock("../../utils/useFetch", () => jest.fn());

describe("Member Component", () => {
  describe("when `useFetch` is awaiting promise to resolve", () => {
    it("displays `Loading...`", () => {
      const chamber = "house";
      const id = "1";
      const props = {
        location: {
          pathname: `/cogress/${chamber}/member/${id}`,
        },
      };

      useFetch.mockReturnValue({
        loading: true,
        data: {},
      });

      const tree = renderer.create(
        <Router>
          <Member {...props} />
        </Router>
      );
      expect(useFetch).toHaveBeenCalledWith(
        `${apiUrlBase}/congress/${chamber}/member/${id}`
      );
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });

  describe("when `useFetch` returns data", () => {
    describe("with 404 status", () => {
      it("displays `Not Found`", () => {
        const chamber = "house";
        const id = "1";
        const props = {
          location: {
            pathname: `/cogress/${chamber}/member/${id}`,
          },
        };

        useFetch.mockReturnValue({
          loading: false,
          data: { status: 404 },
        });

        const tree = renderer.create(
          <Router>
            <Member {...props} />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(
          `${apiUrlBase}/congress/${chamber}/member/${id}`
        );
        expect(tree.toJSON()).toMatchSnapshot();
      });
    });

    describe("with 500 status", () => {
      it("displays error message", () => {
        const chamber = "house";
        const id = "1";
        const props = {
          location: {
            pathname: `/cogress/${chamber}/member/${id}`,
          },
        };

        useFetch.mockReturnValue({
          loading: false,
          data: { error: "server likely on fire", status: 500 },
        });

        const tree = renderer.create(
          <Router>
            <Member {...props} />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(
          `${apiUrlBase}/congress/${chamber}/member/${id}`
        );
        expect(tree.toJSON()).toMatchSnapshot();
      });
    });

    describe("with 200 status", () => {
      it("displays data", () => {
        const chamber = "house";
        const id = "1";
        const props = {
          location: {
            pathname: `/cogress/${chamber}/member/${id}`,
          },
        };

        useFetch.mockReturnValue({
          loading: false,
          data: {
            first_name: "first",
            last_name: "last",
            most_recent_vote: "most_recent_vote",
            status: 200,
          },
        });

        const tree = renderer.create(
          <Router>
            <Member {...props} />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(
          `${apiUrlBase}/congress/${chamber}/member/${id}`
        );
        expect(tree.toJSON()).toMatchSnapshot();
      });
    });
  });

  describe("getSlug", () => {
    describe("when props contain state.chamber and state.id", () => {
      it("pulls params from state", () => {
        const chamber = "house";
        const id = "1";
        const props = {
          location: {
            state: {
              chamber,
              id,
            },
            pathname: `/cogress/somewhereelse/member/wrong`,
          },
        };

        useFetch.mockReturnValue({
          loading: true,
          data: {},
        });

        renderer.create(
          <Router>
            <Member {...props} />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(
          `${apiUrlBase}/congress/${chamber}/member/${id}`
        );
      });
    });
    describe("when props do not contain state.chamber or state.id", () => {
      it("pulls params from pathname", () => {
        const chamber = "house";
        const id = "1";
        const props = {
          location: {
            state: {
              "not-a-chamber": "state-chamber",
              "not-an-id": "state-id",
            },
            pathname: `/cogress/${chamber}/member/${id}`,
          },
        };

        useFetch.mockReturnValue({
          loading: true,
          data: {},
        });

        renderer.create(
          <Router>
            <Member {...props} />
          </Router>
        );
        expect(useFetch).toHaveBeenCalledWith(
          `${apiUrlBase}/congress/${chamber}/member/${id}`
        );
      });
    });
  });
});
