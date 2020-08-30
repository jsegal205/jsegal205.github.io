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
  if (state && state.chamber) {
    // came from internal link
    return state.chamber;
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

  return (
    <section>
      <Link
        to={{
          pathname: `/congress/${chamber}/members`,
          state: { chamber },
        }}
      >
        Back to all members
      </Link>
      <h2>
        {member.first_name} {member.last_name}
      </h2>
      <div>{member.most_recent_vote}</div>
    </section>
  );
};
export default Member;
