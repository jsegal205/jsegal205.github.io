import React from "react";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";

import NotFound from "../not-found";
import Error from "../../components/error";
import Loading from "../../components/loading";

import "../../App.css";
import "./congress.css";
import { Link } from "react-router-dom";
import { partyName, properCase } from "./utils";
import ReactMarkdown from "react-markdown";

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

  const addDefaultSrc = (event) => {
    event.target.src = "/assets/congress-seal.png";
    event.target.alt = "United States Seal of Congress";
  };

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
    misconduct,
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
      <div className="headshot">
        <img
          src={`https://www.congress.gov/img/member/${id.toLowerCase()}.jpg`}
          alt={`Professional headshot of ${first_name} ${last_name}`}
          onError={addDefaultSrc}
        />
      </div>
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
              <label>Most recent vote:</label> {most_recent_vote}
            </li>
            <li>
              <label>Date of Birth:</label> {date_of_birth} (age: {age})
            </li>
            <li>
              <label>Gender:</label> {gender}
            </li>
            <li>
              <label>Current Party:</label> {partyName(current_party)}
            </li>
            <li>
              <label>State Representing:</label> {state}
            </li>
            <li>
              <label>Will be up for re-election in:</label> {next_election}
            </li>
            <li>
              <p>
                Has served <em>{terms}</em> terms starting initially elected
                into office in <em>{initial_elected_in}</em>
              </p>
            </li>
          </ul>
        </section>

        {!!misconduct.length && (
          <section>
            <h3>Official Misconduct Reports</h3>
            <h4>
              Data provided by{" "}
              <a
                href="https://github.com/govtrack/misconduct"
                target="_blank"
                rel="noopener noreferrer"
              >
                GovTrack Congressional Misconduct DB
              </a>
            </h4>

            {misconduct.map((m) => (
              <ul key={m.first_date}>
                <li>
                  <label>Allegation:</label> {properCase(m.allegation)}
                </li>
                <li>
                  <label>Initiated on:</label> {m.first_date}
                </li>
                <li>
                  <label>Allegation Categories:</label>{" "}
                  {m.allegationCategories.join(", ")}
                </li>
                <li>
                  <label>Current Status:</label> {properCase(m.currentStatus)}
                </li>
                <li>
                  <ReactMarkdown source={m.text} />
                </li>
              </ul>
            ))}
          </section>
        )}

        <section>
          <h3>Career Voting History</h3>
          <ul>
            <li>
              <label>Total Votes Eligible:</label>{" "}
              {careerVoting.careerVotesEligible}
            </li>
            <li>
              <label>Total Cast Votes:</label> {careerVoting.careerVotesCast}
            </li>
            <li>
              <label>Total Missed Votes:</label>{" "}
              {careerVoting.careerMissedVotes}
            </li>
            <li>
              <label>Total Present Votes:</label>{" "}
              {careerVoting.careerPresentVotes}
            </li>
            <li>
              <label>Total Votes With {partyName(current_party)} Party:</label>{" "}
              {careerVoting.careerVotesWithParty}*
            </li>
            <li>
              <label>
                Total Votes Against {partyName(current_party)} Party:
              </label>{" "}
              {careerVoting.careerVotesAgainstParty}*
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
                  <label>Congressional Session:</label> {congress} - From{" "}
                  {start_date} until {end_date}
                </li>
                {current_party !== party ? (
                  <li>
                    <label>Party:</label> {partyName(party)}
                  </li>
                ) : null}
                <li>
                  <label>Cast Votes:</label>{" "}
                  {total_votes - missed_votes - total_present}
                </li>
                <li>
                  <label>Votes With {partyName(party)} Party:</label>{" "}
                  {votesWithParty}*
                </li>
                <li>
                  <label>Votes Against {partyName(party)} Party:</label>{" "}
                  {votesAgainstParty}*
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
