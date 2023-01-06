import { Fragment } from "react";
import "../src/index.css";

function PortfolioSite({ Component, pageProps }) {
  // console.log(Component)
  return (
    <Fragment>
      <div data-rootinfo={pageProps} />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default PortfolioSite;
