import React, { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
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

export default MainPage;
