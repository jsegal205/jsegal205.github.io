import React from "react";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";
import useWindowDimensions from "../../utils/windowDimensions";
import { chamberTitles } from "./utils";

import Error from "../../components/error";
import Loading from "../../components/loading";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "../../App.css";
import "./congress.css";
import { Link } from "react-router-dom";

const Congress = () => {
  const { loading, data: congress } = useFetch(`${apiUrlBase}/congress/stats`);
  const { width } = useWindowDimensions();

  const keyMap = {
    D: "democrat",
    F: "female",
    M: "male",
    R: "republican",
    house: "House of Representatives",
    senate: "Senate",
  };

  const properCase = (value) => value.charAt(0).toUpperCase() + value.slice(1);
  const genericLabel = (label, value) => (
    <div>
      {<label>{label}: </label>}
      <span>{value}</span>
    </div>
  );

  const chamberSection = (data, chamber) => (
    <article key={chamber}>
      <hr />
      <h3>{keyMap[chamber]}</h3>
      <Link
        className="chamber-members"
        to={{
          pathname: `/congress/${chamber}/members`,
          state: { chamber },
        }}
      >
        View Current {chamberTitles(chamber)}
      </Link>
      <section className="chamber">
        {!!data[chamber].age.distribution &&
          chamberAgeChart(data[chamber].age.distribution)}
        <section className="chamber-data">
          {ageSection(data[chamber].age, chamber)}
          {genderSection(data[chamber].gender)}
          {partySection(data[chamber].party)}
        </section>
      </section>
    </article>
  );
  const chamberAgeChart = (distribution) => {
    const chamberData = Object.keys(distribution).map((age) => {
      return { ...distribution[age], age: age };
    });

    return (
      <section className="chamber-chart">
        <h3>Distribution of age</h3>
        <BarChart
          width={width * 0.9}
          height={400}
          data={chamberData}
          barGap={"10%"}
          barCategoryGap={"20%"}
          margin={{
            top: 20,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" label={{ value: "Age", position: "bottom" }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar
            dataKey="D"
            stackId="a"
            fill="#0015BC"
            name={properCase(keyMap.D)}
          />
          <Bar
            dataKey="R"
            stackId="a"
            fill="#E9141D"
            name={properCase(keyMap.R)}
          />
          <Bar
            dataKey="M"
            stackId="b"
            fill="#00D136"
            name={properCase(keyMap.M)}
          />
          <Bar
            dataKey="F"
            stackId="b"
            fill="#B533FF"
            name={properCase(keyMap.F)}
          />
        </BarChart>
      </section>
    );
  };

  const ageSection = (age, chamber) => (
    <>
      <section>
        <h4>Average Age</h4>
        {ageLabel("", age.average.all)}

        <section>
          <h5>By Party</h5>
          {ageLabel(properCase(keyMap.D), age.average.democrat)}
          {ageLabel(properCase(keyMap.R), age.average.republican)}
        </section>
        <section>
          <h5>By Gender</h5>
          {ageLabel(properCase(keyMap.F), age.average.female)}
          {ageLabel(properCase(keyMap.M), age.average.male)}
        </section>
      </section>
      {detailedAge(age, "youngest", chamber)}
      {detailedAge(age, "oldest", chamber)}
    </>
  );

  const ageLabel = (label, age) => (
    <div>
      {label ? <label>{label}: </label> : ""}
      <span>{age} years old</span>
    </div>
  );

  const detailedAge = (data, key, chamber) => (
    <section>
      <h4>{properCase(key)} Member</h4>
      <label>
        <Link
          to={{
            pathname: `/congress/${chamber}/member/${data[key].id}`,
            state: { ...data[key] },
          }}
        >
          {data[key].full_name}
        </Link>
      </label>
      {ageLabel("Age", data[key].age)}
      {genericLabel("Date of Birth", data[key].date_of_birth)}
      {genericLabel("State Representation", data[key].state)}
      {genericLabel("Gender", properCase(keyMap[data[key].gender]))}
      {genericLabel("Party", properCase(keyMap[data[key].party]))}
    </section>
  );

  const genderSection = (gender) => (
    <section>
      <h4>Number of Members by Gender</h4>
      {genderData(gender)}
    </section>
  );

  const genderData = (data) => (
    <>
      {genericLabel("Total", data.total)}
      {genericLabel(
        properCase(keyMap.F),
        `${data.women} (${data.percentWomen}%)`
      )}
      {genericLabel(properCase(keyMap.M), `${data.men} (${data.percentMen}%)`)}
    </>
  );

  const partySection = (party) => (
    <section className="congress-party-section">
      <h4>Number of Members by Party</h4>
      {partyChart(party)}
    </section>
  );

  const partyChart = (party) => {
    const democrat = [
      { name: "Male", value: party.D.men, color: "#00D136" },
      { name: "Female", value: party.D.women, color: "#B533FF" },
    ];
    const republican = [
      { name: "Male", value: party.R.men, color: "#00D136" },
      { name: "Female", value: party.R.women, color: "#B533FF" },
    ];

    return (
      <>
        <div className="congress-party-chart-legend">
          <span className="congress-party-chart-legend-item congress-party-chart-legend-item-male">
            .
          </span>
          <span>Male</span>
          <span className="congress-party-chart-legend-item congress-party-chart-legend-item-female">
            .
          </span>
          <span>Female</span>
        </div>
        <section className="congress-party-chart-section">
          <h4 className="congress-party-chart-section-header">Democrats</h4>
          <PieChart width={200} height={200}>
            <Pie dataKey="value" data={democrat} outerRadius={80}>
              {democrat.map((entry) => (
                <Cell fill={entry.color} key={entry.name} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          {genderData(party.D)}
        </section>
        <section className="congress-party-chart-section">
          <h4 className="congress-party-chart-section-header">Republicans</h4>
          <PieChart width={200} height={200}>
            <Pie dataKey="value" data={republican} outerRadius={80}>
              {republican.map((entry) => (
                <Cell fill={entry.color} key={entry.name} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          {genderData(party.R)}
        </section>
      </>
    );
  };

  return (
    <section>
      <h2 className="congress-header">Congressional Information</h2>
      <article className="congress-citation">
        <span>Data provided by </span>
        <a
          href="https://projects.propublica.org/api-docs/congress-api/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Propublica Congress API
        </a>
      </article>
      {loading && <Loading />}
      {congress && congress.error && <Error componentName="Congress" />}
      {congress && !congress.error && (
        <div className="congress">
          {["house", "senate"].map((chamber) =>
            chamberSection(congress, chamber)
          )}
        </div>
      )}
    </section>
  );
};

export default Congress;
