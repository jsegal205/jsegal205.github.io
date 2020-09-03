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
          pathname: `/congress/${chamber}/member/${id}`,
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
            pathname: `/congress/${chamber}/member/${id}`,
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
            pathname: `/congress/${chamber}/member/${id}`,
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
            pathname: `/congress/${chamber}/member/${id}`,
          },
        };

        useFetch.mockReturnValue({
          loading: false,
          data: {
            first_name: "first",
            last_name: "last",
            most_recent_vote: "most_recent_vote",
            age: 1,
            date_of_birth: "1900-01-01",
            gender: "F",
            current_party: "D",
            url: "www.example.com",
            twitter_account: "twitter",
            state: "IL",
            next_election: "2020",
            terms: 1,
            initial_elected_in: "2000-01-01",
            most_recent_vote: "2020-01-01",
            careerVoting: {
              careerVotesEligible: 1,
              careerVotesCast: 2,
              careerMissedVotes: 3,
              careerPresentVotes: 4,
              careerVotesWithParty: 5,
              careerVotesAgainstParty: 6,
            },
            termInfo: [
              {
                congress: "116",
                start_date: "2019-01-03",
                end_date: "2021-01-03",
                total_votes: 6,
                missed_votes: 2,
                total_present: 3,
                votesWithParty: 2,
                votesAgainstParty: 3,
              },
            ],
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
            pathname: `/congress/somewhereelse/member/wrong`,
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
            pathname: `/congress/${chamber}/member/${id}`,
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
