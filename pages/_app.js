import "../public/index.css";
import Card from "../components/Card";
import React from "react";

function PortfolioSite({ Component, pageProps }) {
  return (
    <div className="content-container content-grid">
      <Card {...pageProps} />
      <Component
        activeDescription={pageProps.activeDescription}
        descriptions={pageProps.descriptions}
        titles={pageProps.titles}
        selectedDescription={pageProps.selectedDescription}
      />
    </div>
  );
}

export default PortfolioSite;
