import React, { useEffect, useState } from "react";

import useFetch from "../../utils/useFetch";
import "../../App.css";
import "./spacex.css";

const SpaceX = () => {
  const { loading, data: upcomingLaunch } = useFetch(
    `https://api.spacexdata.com/v3/launches/upcoming?limit=1`
  );

  const calcTimeToLaunch = (nextLaunch) => {
    const difference = +new Date(nextLaunch) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeToLaunch, setTimeToLaunch] = useState(calcTimeToLaunch());

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setTimeToLaunch(calcTimeToLaunch(upcomingLaunch[0]["launch_date_utc"]));
      }, 1000);
    }
  });

  const timerComponents = [];

  Object.keys(timeToLaunch).forEach((interval) => {
    if (!timeToLaunch[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeToLaunch[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <section className="spacex-container">
      <h2>Next Space X Launch</h2>
      {loading && <section>Loading...</section>}

      {upcomingLaunch && upcomingLaunch.length && (
        <>
          <div className="spacex-mega">{timerComponents}</div>

          <h3>{upcomingLaunch[0]["mission_name"]}</h3>
          <div className="spacex-item">
            <label>Rocket:</label>
            <span>{upcomingLaunch[0]["rocket"]["rocket_name"]}</span>
          </div>
          <div className="spacex-item">
            <label>Launch Site:</label>
            <span>{upcomingLaunch[0]["launch_site"]["site_name_long"]}</span>
          </div>

          <div className="spacex-details">{upcomingLaunch[0]["details"]}</div>
        </>
      )}
    </section>
  );
};

export default SpaceX;
