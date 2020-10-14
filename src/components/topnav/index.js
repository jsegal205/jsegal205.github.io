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
              {project.absolute ? (
                <a title={project.subtitle} href={project.link}>
                  {project.title}
                </a>
              ) : (
                <Link title={project.subtitle} to={project.link}>
                  {project.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <hr />
    </>
  );

export default withRouter((props) => <TopNav {...props} />);
