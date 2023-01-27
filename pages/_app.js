import "../src/index.css";
import Card from "../src/components/Card";
import React from "react";

function PortfolioSite({ Component, pageProps }) {
  return (
    <div className="content-container content-grid">
      <Card {...pageProps} />
      <Component descriptions={pageProps.descriptions} />
    </div>
  );
}

export default PortfolioSite;
