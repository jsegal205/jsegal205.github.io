import React from "react";
import "./home.css";
import { projectInfo } from "../../utils";
import { Link } from "react-router-dom";

const randomHexColor = () => Math.floor(Math.random() * 16777215).toString(16);
const complementaryColor = (hex) => {
  const padZero = (str) => {
    const zeros = new Array(2).join("0");
    return (zeros + str).slice(-2);
  };
  const invertColor = (digit) => padZero((255 - digit).toString(16));
  const { r, g, b } = getRGB(hex);

  return invertColor(r) + invertColor(g) + invertColor(b);
};

const textColor = (hex) => {
  const { r, g, b } = getRGB(hex);
  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

  return brightness > 125 ? "444444" : "efefef";
};

const getRGB = (hex) => {
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
};

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
