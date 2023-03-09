import "../public/index.css";
import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";

import BasePage from "../components/BasePage";
import Footer from "../components/Footer";

function PortfolioSite({ Component, pageProps }) {
  const router = useRouter();

  if (pageProps.statusCode == 404) {
    return <Component {...pageProps} />;
  }

  return (
    <Fragment>
      <div className="content-grid grid gap-y-3 lg:gap-0 p-4 md:p-8 2xl:p-32 grid-flow-row pb-0">
        <BasePage {...pageProps} />
        <Component titles={pageProps.titles} />
      </div>
      <Footer />
      <Analytics />
    </Fragment>
  );
}

export default PortfolioSite;
