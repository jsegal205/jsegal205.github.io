import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";
import { chamberTitles, otherChamber, partyName } from "./utils";

import NotFound from "../not-found";
import Error from "../../components/error";
import Loading from "../../components/loading";

import "../../App.css";
import "./congress.css";
import SearchFilter from "../../components/search-filter";

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

  const addDefaultSrc = (event) => {
    event.target.src = "/assets/congress-seal.png";
    event.target.alt = "United States Seal of Congress";
  };

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
      <SearchFilter
        searchValue={memberSearch}
        handleResetClick={handleResetClick}
        handleSearchChange={handleSearchChange}
      />
      {memberList.length ? (
        <ul className="congress-members" data-testid="members-list">
          {memberList.map((member) => {
            return (
              <li key={`${member.id}-${member.party}`}>
                <Link
                  to={{
                    pathname: `/congress/${chamber}/member/${member.id}`,
                    state: { ...member },
                  }}
                  className="congress-members-card"
                >
                  <img
                    src={`https://www.congress.gov/img/member/${member.id.toLowerCase()}.jpg`}
                    alt={`Professional headshot of ${member.first_name} ${member.last_name}`}
                    onError={addDefaultSrc}
                  />
                  <label>
                    {member.first_name} {member.last_name}
                  </label>
                  {partyName(member.party)} - {member.state}
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
