import React from "react";

import { apiUrlBase } from "../../utils";
import useFetch from "../../utils/useFetch";

import Error from "../../components/error";
import Loading from "../../components/loading";

import "../../App.css";

const Shorts = () => {
  const { loading, data: results } = useFetch(`${apiUrlBase}/shorts`);

  if (loading) {
    return <Loading />;
  }

  if (results.error) {
    return <Error componentName={`"Is Jim Wearing Shorts"`} />;
  }

  return (
    <section>
      <h2>Is Jim wearing shorts?</h2>

      <section>
        <article>
          There is a <strong>{results.probability}%</strong> chance he is.
        </article>
        <br />
        <article>
          Based on the following criteria:
          <ul>
            {results.criteria.map((crit) => (
              <li key={crit.label}>
                {crit.label}: {crit.value}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </section>
  );
};

export default Shorts;
