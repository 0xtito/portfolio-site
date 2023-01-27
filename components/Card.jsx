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
<<<<<<< HEAD
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
=======
>>>>>>> d8e2226 (rearranged folder structure)
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
