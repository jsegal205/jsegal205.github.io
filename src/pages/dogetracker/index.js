import React from "react";
import useFetch from "../../utils/useFetch";

import Error from "../../components/error";
import Loading from "../../components/loading";

import "../../App.css";
import "./dogecoin.css";

const DogeTracker = () => {
  const { loading, data: results } = useFetch(
    `https://api.coingecko.com/api/v3/coins/dogecoin`
  );

  if (loading) {
    return <Loading />;
  }

  if (results.error) {
    return <Error componentName={"Dogecoin price tracker"} />;
  }

  return (
    <section className="doge-cointainer">
      <h2 className="doge-title">What is Dogecoin's current price?</h2>

      <section className="doge-cointainer">
        <img
          className="doge-image"
          src="https://i.imgur.com/jEll6Tr.gif"
          alt="a spinning coin with with the official dogecoin logo on one side and a shiba inu with the word WOW embossed on the coin"
        />
        <h3 className="doge-price">
          $ {results.market_data.current_price.usd} (USD)
        </h3>
        <h3 className="doge-price">
          {results.market_data.current_price.btc} (Bitcoin)
        </h3>
      </section>
    </section>
  );
};

export default DogeTracker;
