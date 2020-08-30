import React from "react";
import { Link } from "react-router-dom";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";

import NotFound from "../not-found";
import Error from "../../components/error";
import Loading from "../../components/loading";

import "../../App.css";
import "./congress.css";

const getChamber = ({ pathname, state }) => {
  if (state && state.chamber) {
    // came from internal link
    return state.chamber;
  }

  // direct page load
  const pathNameSplit = pathname.split("/");
  return pathNameSplit[pathNameSplit.length - 2];
};

const CongressMembers = (props) => {
  const chamber = getChamber(props.location);
  const { loading, data: members } = useFetch(
    `${apiUrlBase}/congress/${chamber}/members`
  );

  if (loading) {
    return <Loading />;
  }

  if (members.status === 404 || !chamber.match(/^(house|senate)$/)) {
    return <NotFound />;
  }

  if (members.error) {
    return <Error componentName="Congress Memebers" />;
  }

  return (
    <section>
      <Link
        className="chamber-members"
        to={{
          pathname: `/congress`,
        }}
      >
        All Congress Data
      </Link>
      <ul className="congress-members">
        {members[chamber].map((member) => {
          return (
            <li key={member.id}>
              <Link
                to={{
                  pathname: `/congress/${chamber}/member/${member.id}`,
                  state: { ...member },
                }}
              >
                {member.first_name} {member.last_name} ({member.party}-
                {member.state})
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default CongressMembers;
