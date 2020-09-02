import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";
import { chamberTitles, otherChamber } from "./utils";

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

  const [memberSearch, setMemberSearch] = useState("");
  const handleSearchChange = (event) => {
    setMemberSearch(event.target.value);
  };
  const handleResetClick = () => {
    setMemberSearch("");
  };

  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    if (!loading && members) {
      if (members.error || members.status === 404) {
        setMemberList([]);
        return;
      }

      const results = members[chamber]
        ? members[chamber].filter(
            (member) =>
              member.first_name
                .toLowerCase()
                .includes(memberSearch.toLowerCase()) ||
              member.last_name
                .toLowerCase()
                .includes(memberSearch.toLowerCase())
          )
        : [];
      setMemberList(results);
    }
  }, [loading, members, chamber, memberSearch]);

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
      <h2 className="congress-header">Current {chamberTitles(chamber)}</h2>
      <Link
        className="chamber-members"
        to={{ pathname: `/congress/${otherChamber(chamber)}/members` }}
      >
        View Current {chamberTitles(otherChamber(chamber))}
      </Link>
      <hr />
      <section className="members-filter-container">
        <label htmlFor="members-filter">Search</label>
        <input
          type="text"
          id="members-filter"
          className="members-filter-input"
          value={memberSearch}
          onChange={handleSearchChange}
          data-testid="members-filter"
        />
        {memberSearch && (
          <button
            className="members-filter-reset"
            onClick={handleResetClick}
            data-testid="members-filter-reset"
          >
            reset
          </button>
        )}
      </section>
      {memberList.length ? (
        <ul className="congress-members" data-testid="members-list">
          {memberList.map((member) => {
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
      ) : (
        <div className="members-no-results">
          No results for{" "}
          <strong>
            <em>{memberSearch}</em>
          </strong>
        </div>
      )}
    </section>
  );
};
export default CongressMembers;
