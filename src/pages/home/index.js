import React from "react";
import { Link } from "react-router-dom";

import "./home.css";

import { projectInfo } from "../../utils";
import {
  complementaryColor,
  randomHexColor,
  textColor,
} from "../../utils/color";

const cardDetails = (project, color) => (
  <>
    <div
      className="project-list-item-placeholder"
      style={{
        backgroundColor: `#${color}`,
      }}
    >
      <h2
        className="project-list-item-title"
        style={{ color: `#${textColor(color)}` }}
      >
        {project.title}
      </h2>
    </div>

    {!!project.subtitle ? <p>{project.subtitle}</p> : null}
  </>
);

const Home = () => (
  <section>
    <ul className="project-list">
      {projectInfo.map((project) => {
        const borderColor = randomHexColor();
        const complementaryBorderColor = complementaryColor(borderColor);
        return (
          <li
            key={project.title}
            className="project-list-item"
            style={{ borderColor: `#${borderColor}` }}
          >
            {project.absolute ? (
              <a className="project-list-item-link" href={project.link}>
                {cardDetails(project, complementaryBorderColor)}
              </a>
            ) : (
              <Link className="project-list-item-link" to={project.link}>
                {cardDetails(project, complementaryBorderColor)}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  </section>
);

export default Home;
