import { Fragment } from "react";
import "../src/index.css";

function PortfolioSite({ Component, pageProps }) {
  return (
    <Fragment>
      <Component {...pageProps} id="test" />
    </Fragment>
  );
}

export default PortfolioSite;
