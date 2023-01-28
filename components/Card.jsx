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
        className="pudgy"
        alt="lil pudgy"
        src={pudgyImg}
      ></Image>
      <div className="intro_content content_width">{intro}</div>
      <Title
        title="0xtito"
        titleWithHover="0xtito.eth"
        phrase="'Not Today'"
      ></Title>
      <ShowNfts nfts={nfts} defaultNft={defaultNft} />
    </Fragment>
  );
}
