import React from "react";

const Error = ({ componentName }) => (
  <section>
    <h3>
      Whoops! There was a problem loading
      {componentName ? ` ${componentName} data.` : " data."}
    </h3>
    <p>Please reload browser to try again in a little bit.</p>
  </section>
);

export default Error;
