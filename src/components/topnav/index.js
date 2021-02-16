import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./topnav.css";

const TopNav = (props) =>
  props.location.pathname === "/" ? null : (
    <>
      <nav>
        <ul className="topnav-list">
          <li className="topnav-list-item">
            <Link title="Projects that I like to work on" to="/">
              All Projects
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
    </>
  );

export default withRouter((props) => <TopNav {...props} />);
