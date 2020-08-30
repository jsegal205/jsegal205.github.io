import React from "react";

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
    <ul>
      {members[chamber].map((member) => {
        return (
          <li>
            {member.first_name} {member.last_name} ({member.party}-
            {member.state})
          </li>
        );
      })}
    </ul>
  );
};
export default CongressMembers;
