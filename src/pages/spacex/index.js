import React, { useEffect, useState, Fragment } from "react";

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
      if (upcomingLaunch.error) {
        setTimeToLaunch(0);
        return;
      }

      setTimeout(() => {
        setTimeToLaunch(calcTimeToLaunch(upcomingLaunch[0]["launch_date_utc"]));
      }, 1000);
    }
  }, [loading, upcomingLaunch]);

  const timerComponents = [];

  Object.keys(timeToLaunch).forEach((interval) => {
    if (interval !== "seconds" && !timeToLaunch[interval]) {
      return;
    }

    timerComponents.push(
      <div key={interval}>
        {timeToLaunch[interval]} {interval}{" "}
      </div>
    );
  });

  return (
    <section className="spacex-container">
      <h2>Next Space X Launch</h2>
      {loading && <section>Loading...</section>}
      {upcomingLaunch && upcomingLaunch.error && (
        <section>
          <h3>Whoops! There was a problem loading SpaceX data.</h3>
          <p>Please reload browser to try again in a little bit.</p>
        </section>
      )}

      {upcomingLaunch && upcomingLaunch.length && (
        <>
          {upcomingLaunch.map((launch) => (
            <Fragment key={launch["mission_name"]}>
              <div className="spacex-mega">{timerComponents}</div>

              <h3>{launch["mission_name"]}</h3>
              <div className="spacex-item">
                <label>When:</label>
                <span>{new Date(launch["launch_date_utc"]).toString()}</span>
              </div>
              <div className="spacex-item">
                <label>Rocket:</label>
                <span>{launch["rocket"]["rocket_name"]}</span>
              </div>
              <div className="spacex-item">
                <label>Launch Site:</label>
                <span>{launch["launch_site"]["site_name_long"]}</span>
              </div>

              <div className="spacex-details">{launch["details"]}</div>
            </Fragment>
          ))}
        </>
      )}
    </section>
  );
};

export default SpaceX;
