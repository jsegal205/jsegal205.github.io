import React from "react";
import { Link } from "react-router-dom";

import "./home.css";

import { projectInfo } from "../../utils";
import {
  complementaryColor,
  randomHexColor,
  textColor,
} from "../../utils/color";

const Home = () => {
  return (
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
              <Link className="project-list-item-link" to={project.link}>
                <div
                  className="project-list-item-placeholder"
                  style={{
                    backgroundColor: `#${complementaryBorderColor}`,
                  }}
                >
                  <h2
                    className="project-list-item-title"
                    style={{ color: `#${textColor(complementaryBorderColor)}` }}
                  >
                    {project.title}
                  </h2>
                </div>

                <p>{project.subtitle}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Home;
