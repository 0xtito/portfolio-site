import "../public/index.css";
import React, { Fragment } from "react";
import { useRouter } from "next/router";

import Card from "../components/Card";
import Footer from "../components/Footer";

function PortfolioSite({ Component, pageProps }) {
  const router = useRouter();

  if (pageProps.statusCode == 404) {
    return <Component {...pageProps} />;
  }

  return (
    <Fragment>
      <div className="content-grid grid p-8 grid-flow-row pb-0">
        <Card {...pageProps} />
        <Component
          activeDescription={pageProps.activeDescription}
          descriptions={pageProps.descriptions}
          titles={pageProps.titles}
          selectedDescription={pageProps.selectedDescription}
        />
      </div>
      <Footer />
    </Fragment>
  );
}

export default PortfolioSite;
