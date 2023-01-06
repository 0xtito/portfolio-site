import { Fragment, useRef } from "react";
import "../src/index.css";

function PortfolioSite({ Component, pageProps }) {
  const descriptionsRef = useRef();
  descriptionsRef.current = pageProps;
  console.log(descriptionsRef.current)
  console.log(Component)
  return (
    <Fragment>
      <div data-desc-info={descriptionsRef} />
      <Component {...pageProps} id="test" />
    </Fragment>
  );
}

export default PortfolioSite;
