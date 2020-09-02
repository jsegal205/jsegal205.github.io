import React from "react";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";

import NotFound from "../not-found";
import Error from "../../components/error";
import Loading from "../../components/loading";

import "../../App.css";
import "./congress.css";
import { Link } from "react-router-dom";

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
          <label>Current Party: {current_party}</label>
        </li>
        <li>
          <label>State Representing: {state}</label>
        </li>
        <li>
          <label>Will be up for reelection in: {next_election}</label>
        </li>
        <li>
          <label>
            Has served <em>{terms}</em> terms starting initially elected into
            office in <em>{initial_elected_in}</em>
          </label>
        </li>
      </ul>

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
    </section>
  );
};
export default Member;
