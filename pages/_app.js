import "../src/index.css";

import ShowNfts from "../src/components/ShowNfts";
import React, { useEffect, useState } from "react";
import { setLazyProp } from "next/dist/server/api-utils";
import { Provider } from "../src/components/contexts/NftsContext";
// import axios;

/**
 * TODO: Make it so the nfts load in at the same time
 * as the rest of the app through SSG
 */

function PortfolioSite({ Component, pageProps }) {
  const filterNfts = (nfts) => {
    nfts.sort((a, b) => {
      let orderOfA = a.order;
      let orderOfB = b.order;

      return orderOfA - orderOfB;
    });

    return nfts;
  };

  return (
    // <Provider value={{ value }}>
    <div className="content-container content-grid">
      <Component {...pageProps} />
      <ShowNfts nfts={pageProps.nfts ? filterNfts(pageProps.nfts) : []} />
    </div>
    // </Provider>
  );
}

export default PortfolioSite;
