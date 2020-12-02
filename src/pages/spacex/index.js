import React, { useEffect, useState, Fragment, useRef } from "react";

import useFetch from "../../utils/useFetch";
import Error from "../../components/error";

import "../../App.css";
import "./spacex.css";
import Loading from "../../components/loading";

const SpaceX = () => {
  const { loading, data: upcomingLaunch } = useFetch(
    `https://api.spacexdata.com/v3/launches/upcoming?limit=2`
  );

  const futureLaunchIndex = () => {
    if (!loading && upcomingLaunch.length) {
      return upcomingLaunch[0]["launch_date_unix"] < Date.now() / 1000 ? 1 : 0;
    }
  };

  const calcTimeToLaunch = () => {
    let timeLeft = {};
    if (!loading && timeCalculated.current) {
      if (upcomingLaunch.error) {
        return timeLeft;
      }

      if (upcomingLaunch[futureLaunchIndex()]) {
        const difference =
          upcomingLaunch[futureLaunchIndex()]["launch_date_unix"] -
          Date.now() / 1000;

        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (60 * 60 * 24)),
            hours: Math.floor((difference / (60 * 60)) % 24),
            minutes: Math.floor((difference / 60) % 60),
            seconds: Math.floor(difference % 60),
          };
        }
      }
    }
    return timeLeft;
  };

  const timeCalculated = useRef(false);
  const [timeToLaunch, setTimeToLaunch] = useState(calcTimeToLaunch());
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!timeCalculated.current) {
        timeCalculated.current = true;
      }
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

  const launchDetails = () => {
    if (timeCalculated.current === false) {
      return null;
    }

    const launch = upcomingLaunch[futureLaunchIndex()];
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const launchDate = new Date(launch["launch_date_utc"]).toLocaleString(
      "en-US",
      options
    );
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
  };

  return (
    <section className="spacex-container">
      <h2>Next Space X Launch</h2>
      {(loading || !timeCalculated.current) &&
        !(upcomingLaunch && upcomingLaunch.error) && <Loading />}
      {upcomingLaunch && upcomingLaunch.error && (
        <Error componentName="SpaceX" />
      )}

      {upcomingLaunch && upcomingLaunch.length && launchDetails()}
    </section>
  );
};

export default SpaceX;
