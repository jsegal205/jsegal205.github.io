import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./topnav.css";
import { projectInfo } from "../../utils";

const TopNav = (props) =>
  props.location.pathname === "/" ? null : (
    <>
      <nav>
        <ul className="topnav-list">
          {projectInfo.map((project) => (
            <li className="topnav-list-item" key={project.title}>
              <Link to={project.link}>{project.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <hr />
    </>
  );

export default withRouter((props) => <TopNav {...props} />);
