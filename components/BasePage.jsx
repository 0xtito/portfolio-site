import React, { useState, useContext, useEffect, Fragment } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

import ShowNfts from "./ShowNfts";
import Title from "./Title";

export default function BasePage({ nfts, defaultNft, pudgyImg, intro }) {
  const router = useRouter();
  const activePage = router.query.descriptionTitle;

  return (
    <Fragment>
      <Head>
        <title>{activePage ? `0xtito - ${activePage}` : "0xtito - home"}</title>
        <meta name="0xtito" lang="en" content="portfolio site" />
      </Head>
      <Image
        width={75}
        height={75}
        className="hidden lg:grid rounded-full col-span-1 row-span-1  mt-0 mx-auto"
        alt="lil pudgy"
        src={pudgyImg}
      ></Image>
      <div className="my-0 mr-auto ml-0 row-start-1 col-start-1 md:col-start-2 lg:col-end-4 col-end-5  text-base">
        {intro}
      </div>
      <Title phrase='"my big fish must be somewhere"'></Title>
      <ShowNfts nfts={nfts} defaultNft={defaultNft} />
    </Fragment>
  );
}
