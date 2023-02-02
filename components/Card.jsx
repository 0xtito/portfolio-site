import React, { useState, useContext, useEffect, Fragment } from "react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

import ShowNfts from "./ShowNfts";
import Title from "./Title";

export default function Card({ nfts, defaultNft, pudgyImg, intro }) {
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
        className="rounded-full col-span-1 row-span-1 w-75 h-75 mt-0 mx-auto"
        alt="lil pudgy"
        src={pudgyImg}
      ></Image>
      <div className="my-0 mr-auto ml-0 col-start-2 col-end-4 text-base">
        {intro}
      </div>
      <Title phrase="'Not Today'"></Title>
      <ShowNfts nfts={nfts} defaultNft={defaultNft} />
    </Fragment>
  );
}
