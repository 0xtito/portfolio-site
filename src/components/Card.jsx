import React, { useState, useContext, useEffect, Fragment } from "react";
import Image from "next/image";
import Head from "next/head";

import { Provider } from "./contexts/NftsContext";
import ShowNfts from "./ShowNfts";
import Title from "./Title";

const defaultImageSrc = "https://api.pudgypenguins.io/lil/image/4495";

export default function Card(props) {
  const { nfts: nftsProp, defaultNft, pudgyImg, intro: introProps } = props;
  //   const [pudgy, setPudgy] = useState(defaultImageSrc);
  //   const [intro, setIntro] = useState(null);
  //   const [nfts, setNfts] = useState(nftsProp);

  //   useEffect(() => {
  //     setPudgy(pudgyImg);
  //     setIntro(introProps);
  //     setNfts(nftsProp);
  //   }, []);

  //   if (loading) return <p>Loading</p>;

  return (
    <Fragment>
      <Head>
        <title>home</title>
        <meta name="0xtito" lang="en" content="portfolio site" />
      </Head>
      <Image
        width={75}
        height={75}
        className="pudgy"
        alt="lil pudgy"
        // unoptimized
        // priority={true}
        // loading="lazy"
        src={pudgyImg}
      ></Image>
      <div className="intro_content content_width">{introProps}</div>
      <Title
        title="0xtito"
        titleWithHover="0xtito.eth"
        phrase="'Not Today'"
      ></Title>
      <ShowNfts nfts={nftsProp} defaultNft={defaultNft} />
    </Fragment>
  );
}
