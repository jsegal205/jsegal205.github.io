import React from "react";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";

import NotFound from "../not-found";
import Error from "../../components/error";
import Loading from "../../components/loading";

import "../../App.css";
import "./congress.css";
import { Link } from "react-router-dom";
import { partyName } from "./utils";

const getUrlParams = ({ pathname, state }) => {
  if (state && state.chamber && state.id) {
    // came from internal link
    return { chamber: state.chamber, id: state.id };
  }

  // direct page load
  const pathNameSplit = pathname.split("/");
  return {
    chamber: pathNameSplit[pathNameSplit.length - 3],
    id: pathNameSplit[pathNameSplit.length - 1],
  };
};

const Member = (props) => {
  const { chamber, id } = getUrlParams(props.location);

  const { loading, data: member } = useFetch(
    `${apiUrlBase}/congress/${chamber}/member/${id}`
  );

  if (loading) {
    return <Loading />;
  }

  if (member.status === 404 || !chamber.match(/^(house|senate)$/)) {
    return <NotFound />;
  }

  if (member.error) {
    return <Error componentName="Congress Memeber" />;
  }

  const {
    age,
    first_name,
    last_name,
    date_of_birth,
    gender,
    current_party,
    url,
    twitter_account,
    state,
    next_election,
    terms,
    initial_elected_in,
    most_recent_vote,
    careerVoting,
    termInfo,
  } = member;
  return (
    <section className="congress-member">
      <Link
        to={{
          pathname: `/congress/${chamber}/members`,
          state: { chamber },
        }}
      >
        Back to all members
      </Link>
      <h2>
        {first_name} {last_name}
      </h2>
      <section className="congress-member-links">
        <a href={url} target="_blank" rel="noopener noreferrer">
          Website
        </a>

        <a
          href={`https://twitter.com/${twitter_account}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      </section>
      <hr />
      <article className="information">
        <section>
          <ul>
            <li>
              <label>Most recent vote: {most_recent_vote}</label>
            </li>
            <li>
              <label>
                Date of Birth: {date_of_birth} (age: {age})
              </label>
            </li>
            <li>
              <label>Gender: {gender}</label>
            </li>
            <li>
              <label>Current Party: {partyName(current_party)}</label>
            </li>
            <li>
              <label>State Representing: {state}</label>
            </li>
            <li>
              <label>Will be up for reelection in: {next_election}</label>
            </li>
            <li>
              <label>
                Has served <em>{terms}</em> terms starting initially elected
                into office in <em>{initial_elected_in}</em>
              </label>
            </li>
          </ul>
        </section>

        <section>
          <h3>Career Voting History</h3>
          <ul>
            <li>
              <label>
                Total Votes Eligible: {careerVoting.careerVotesEligible}
              </label>
            </li>
            <li>
              <label>Total Cast Votes: {careerVoting.careerVotesCast}</label>
            </li>
            <li>
              <label>
                Total Missed Votes: {careerVoting.careerMissedVotes}
              </label>
            </li>
            <li>
              <label>
                Total Present Votes: {careerVoting.careerPresentVotes}
              </label>
            </li>
            <li>
              <label>
                Total Votes With {partyName(current_party)} Party:{" "}
                {careerVoting.careerVotesWithParty}*
              </label>
            </li>
            <li>
              <label>
                Total Votes Against {partyName(current_party)} Party:{" "}
                {careerVoting.careerVotesAgainstParty}*
              </label>
            </li>
          </ul>
        </section>

        <section>
          <h3>Individual Term Voting Statistics</h3>

          {termInfo.map((term) => {
            const {
              congress,
              start_date,
              end_date,
              total_votes,
              missed_votes,
              party,
              total_present,
              votesWithParty,
              votesAgainstParty,
            } = term;
            return (
              <ul key={`${congress}-${party}`} className="term-info">
                <li>
                  <label>
                    Congressional Session: {congress} - From {start_date} until{" "}
                    {end_date}
                  </label>
                </li>
                {current_party !== party ? (
                  <li>
                    <label>Party: {partyName(party)}</label>
                  </li>
                ) : null}
                <li>
                  <label>
                    Cast Votes: {total_votes - missed_votes - total_present}
                  </label>
                </li>
                <li>
                  Votes With {partyName(party)} Party: {votesWithParty}*
                </li>
                <li>
                  Votes Against {partyName(party)} Party: {votesAgainstParty}*
                </li>
              </ul>
            );
          })}
        </section>
        <footer className="footnote">
          * - counts relating to votes with or against party might be off due to
          rounding precision or insufficient historical data provided
        </footer>
      </article>
    </section>
  );
};
export default Member;
