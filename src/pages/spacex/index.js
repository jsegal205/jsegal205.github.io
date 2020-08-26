import React, { useEffect, useState, Fragment } from "react";

import useFetch from "../../utils/useFetch";
import Error from "../../components/error";

import "../../App.css";
import "./spacex.css";
import Loading from "../../components/loading";

const SpaceX = () => {
  const { loading, data: upcomingLaunch } = useFetch(
    `https://api.spacexdata.com/v3/launches/upcoming?limit=1`
  );

  const calcTimeToLaunch = () => {
    let timeLeft = {};
    if (!loading) {
      if (upcomingLaunch.error) {
        return timeLeft;
      }

      if (upcomingLaunch[0]) {
        const difference =
          +new Date(upcomingLaunch[0]["launch_date_utc"]) - +new Date();

        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
      }
    }
    return timeLeft;
  };

  const [timeToLaunch, setTimeToLaunch] = useState(calcTimeToLaunch());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeToLaunch(calcTimeToLaunch());
    }, 1000);
    return () => clearTimeout(timer);
  });

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
      {loading && <Loading />}
      {upcomingLaunch && upcomingLaunch.error && (
        <Error componentName="SpaceX" />
      )}

      {upcomingLaunch && upcomingLaunch.length && (
        <>
          {upcomingLaunch.map((launch) => {
            const options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            };

            const launchDate = new Date(
              launch["launch_date_utc"]
            ).toLocaleString("en-US", options);
            return (
              <Fragment key={launch["mission_name"]}>
                <div className="spacex-mega">{timerComponents}</div>

                <h3>{launch["mission_name"]}</h3>
                <div className="spacex-item">
                  <label>When:</label>
                  <span>{launchDate}</span>
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
            );
          })}
        </>
      )}
    </section>
  );
};

export default SpaceX;
