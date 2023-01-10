import React, { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";
import localforage from "localforage";
import path from "path";

import BasePage from "../src/components/BasePage";

function MainPage(props) {
  let { descriptions, intro, nfts, pudgyImg, fromRoot } = props;
  // localforage.config({
  //   name: "portfolio-info",
  //   driver: localforage.LOCALSTORAGE,
  // });

  // console.log(
  //   localforage.getItem("descriptions").then((res) => console.log(res))
  // );

  if (typeof window !== "undefined") handleStorage(descriptions);

  // if (typeof window === "undefined") {
  //   console.log("in server-side", localforage);
  // } else {

  // }

  return (
    <div className="content-container content-grid">
      <Head>
        <title>home</title>
        <meta name="0xtito" lang="en" content="portfolio site" />
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
  const DB_PW = process.env.MONGO_PW;

  const clientDescription = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/descriptionsDB?retryWrites=true&w=majority`
  );

  const clientNft = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/images?retryWrites=true&w=majority`
  );

  const dbDescription = clientDescription.db();
  const dbNft = clientNft.db();

  const descriptionCollection = dbDescription.collection("descriptions");
  const introCollection = dbDescription.collection("intro");
  const nftsCollection = dbNft.collection("nfts");
  const pudgyCollection = dbNft.collection("pudgy");

  const descriptions = await descriptionCollection.find().toArray();
  const nfts = await nftsCollection.find().toArray();
  const intro = await introCollection.findOne();
  const pudgyImg = await pudgyCollection.findOne();

  // console.log(
  //   nfts.map((nft) => ({
  //     url: !nft.Animated ? nft.metadata.image : nft.metadata.animation_url,
  //   }))
  // );

  return {
    props: {
      descriptions: descriptions.map((des) => ({
        title: des.title,
        description: des.description,
      })),
      intro: intro.intro,
      nfts: nfts.map((nft) => ({
        title: nft.name,
        id: nft.id,
        order: nft.order,
        isAnimated: nft.isAnimated,
        imageUrl: !nft.isAnimated ? nft.metadata.image : null,
        animationUrl: nft.isAnimated ? nft.metadata.animation_url : null,
      })),
      pudgyImg: pudgyImg.rawMetadata.image,
      fromRoot: true,
    },
    revalidate: 1,
  };
}

async function handleStorage(descriptions) {
  const descriptionItem = window.localStorage.getItem("descriptions");
  const curNftItem = window.localStorage.getItem("curNftIndex");

  if (descriptionItem == null) {
    window.localStorage.setItem("descriptions", descriptions);
    console.log(window.localStorage.getItem("descriptions"));
    console.log("set des storage");
    // localforage
    //   .setItem("descriptions", descriptions)
    //   .then((log) => console.log("descriptions now set", log));
  } else {
    console.log("already stored");
  }

  if (curNftItem == null) {
    window.localStorage.setItem("curNftIndex", 0);
    console.log("set index");
    // localforage
    //   .setItem("curNftIndex", 0)
    //   .then((index) => console.log("set init nft index", index));
  } else {
    console.log("already stored");
  }
}

export default MainPage;
