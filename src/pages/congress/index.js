import React, { Fragment } from "react";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";
import useWindowDimensions from "../../utils/windowDimensions";
import Error from "../../components/error";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "../../App.css";
import "./congress.css";

const Congress = () => {
  const { loading, data: congress } = useFetch(`${apiUrlBase}/congress/stats`);
  const { width } = useWindowDimensions();

  const keyMap = {
    D: "democrat",
    F: "female",
    M: "male",
    R: "republican",
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
      <h3>{properCase(chamber)}</h3>
      <hr />
      <section className="chamber">
        {!!data[chamber].age.distribution &&
          chamberAgeChart(data[chamber].age.distribution)}
        <section className="chamber-data">
          {ageSection(data[chamber].age)}
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

  const ageSection = (age) => (
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
      {detailedAge(age, "youngest")}
      {detailedAge(age, "oldest")}
    </>
  );

  const ageLabel = (label, age) => (
    <div>
      {label ? <label>{label}: </label> : ""}
      <span>{age} years old</span>
    </div>
  );

  const detailedAge = (data, key) => (
    <section>
      <h4>{properCase(key)} Member</h4>
      <label>{data[key].full_name}</label>
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
    <section>
      <h4>Number of Members by Party</h4>
      {["D", "R"].map((partyKey) => (
        <Fragment key={partyKey}>
          <h5>{properCase(keyMap[partyKey])}</h5>
          {genderData(party[partyKey])}
        </Fragment>
      ))}
    </section>
  );

  return (
    <section>
      <h2 className="congress-header">Congressional Information</h2>
      {loading && <section className="congress-header">Loading...</section>}
      {congress && congress.error && <Error componentName="Congress" />}
      {congress && !congress.error && (
        <>
          <div className="congress-subheader">Session #{congress.session}</div>
          <div className="congress">
            {["house", "senate"].map((chamber) =>
              chamberSection(congress, chamber)
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Congress;
