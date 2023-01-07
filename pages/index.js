import React, { useEffect, useState } from "react";
import Head from "next/head";
import path from "path";

import BasePage from "../src/components/BasePage";

function MainPage(props) {
  let { descriptions, intro, nfts, pudgyImg, fromRoot } = props;

  return (
    <div className="content-container content-grid">
      <Head>
        <title>home</title>
        <meta name="0xtito" content="portfolio site" />
      </Head>
      <BasePage
        descriptions={descriptions}
        intro={intro}
        nfts={nfts}
        pudgyImg={pudgyImg}
        selectedTitle={null}
        fromRoot={fromRoot}
      />
    </div>
  );
}

export async function getStaticProps() {
  const url = "http://localhost:3000/";
  const nftFilePath = path.join(url, "api", "nfts");
  const descriptionFilePath = path.join(url, "api", "descriptions");

  const nftRes = await fetch(nftFilePath);
  const { nfts, pudgyImg } = await nftRes.json();

  const desRes = await fetch(descriptionFilePath);
  const { descriptions, intro } = await desRes.json();

  return {
    props: {
      descriptions: descriptions.map((des) => ({
        title: des.title,
        description: des.description,
      })),
      intro: intro.intro,
      nfts: nfts,
      pudgyImg: pudgyImg,
      fromRoot: true,
    },
    revalidate: 1,
  };
}

export default MainPage;
