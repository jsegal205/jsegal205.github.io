import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { toMatchDiffSnapshot } from "snapshot-diff";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";
import CongressMembers from "./members";

expect.extend({ toMatchDiffSnapshot });

jest.mock("../../utils/useFetch", () => jest.fn());

describe("CongressMembers Component", () => {
  describe("when `useFetch` is awaiting promise to resolve", () => {
    it("displays `Loading...`", () => {
      const chamber = "doesNotExist";
      const props = {
        location: {
          pathname: `/congress/${chamber}/members`,
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
            pathname: `/congress/${chamber}/members`,
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
            pathname: `/congress/${chamber}/members`,
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
            pathname: `/congress/${chamber}/members`,
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
            pathname: `/congress/house/members`,
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
            pathname: `/congress/house/members`,
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

  describe("Search filtering", () => {
    const apiData = {
      house: [
        {
          id: 1,
          first_name: "abc",
          last_name: "efg",
          party: "party",
          state: "state",
        },
        {
          id: 2,
          first_name: "uxw",
          last_name: "xyz",
          party: "party",
          state: "state",
        },
      ],
    };

    const setup = () => {
      const props = {
        location: {
          pathname: `/congress/house/members`,
        },
      };

      useFetch.mockReturnValue({
        loading: false,
        data: apiData,
      });

      return render(
        <Router>
          <CongressMembers {...props} />
        </Router>
      );
    };

    it("defaults search input to empty string", () => {
      const { container } = setup();
      const membersFilter = getByTestId(container, "search-filter");
      const membersList = getByTestId(container, "members-list");
      const membersListItems = membersList.querySelectorAll("li");

      expect(membersFilter.value).toBe("");
      expect(membersListItems.length).toEqual(apiData["house"].length);
      expect(membersListItems[0].querySelector("a").innerHTML).toContain(
        apiData["house"][0].first_name
      );
      expect(membersListItems[1].querySelector("a").innerHTML).toContain(
        apiData["house"][1].first_name
      );
    });

    describe("when input matches subset of the data", () => {
      it("only shows data to match first name", () => {
        const { container, asFragment } = setup();

        const initialRender = asFragment();
        const memberFilter = getByTestId(container, "search-filter");
        fireEvent.change(memberFilter, { target: { value: "abc" } });

        expect(initialRender).toMatchDiffSnapshot(asFragment());
      });

      it("only shows data to match last name", () => {
        const { container, asFragment } = setup();

        const initialRender = asFragment();
        const memberFilter = getByTestId(container, "search-filter");
        fireEvent.change(memberFilter, { target: { value: "xyz" } });

        expect(initialRender).toMatchDiffSnapshot(asFragment());
      });
    });

    describe("when input matches none of the data", () => {
      it("only shows data to match", () => {
        const { container, asFragment } = setup();

        const initialRender = asFragment();
        const memberFilter = getByTestId(container, "search-filter");
        fireEvent.change(memberFilter, { target: { value: "mno" } });

        expect(initialRender).toMatchDiffSnapshot(asFragment());
      });
    });

    describe("when reset clicked", () => {
      it("resets search input value", () => {
        const { container } = setup();

        const recipeFilter = getByTestId(container, "search-filter");
        fireEvent.change(recipeFilter, { target: { value: "a" } });

        expect(recipeFilter.value).toBe("a");

        const recipeFilterReset = getByTestId(container, "search-filter-reset");

        fireEvent.click(recipeFilterReset);
        expect(recipeFilter.value).toBe("");
      });
    });
  });
});
