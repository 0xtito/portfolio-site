import React, { Fragment } from "react";
import Head from "next/head";
import BasePage from "../src/components/BasePage";
import { MongoClient } from "mongodb";
import { Provider } from "../src/components/contexts/NftsContext";

function MainPage(props) {
  const { descriptions, intro, pudgyImg, nfts, init } = props;

  return (
    <Fragment>
      <Head>
        <title>home</title>
        <meta name="0xtito" lang="en" content="portfolio site" />
      </Head>
      <Provider value={pudgyImg}>
        <BasePage
          descriptions={descriptions}
          intro={intro}
          pudgyImg={pudgyImg}
          selectedTitle={null}
          nfts={nfts}
          init={init}
        />
      </Provider>
    </Fragment>
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
      init: true,
    },
    revalidate: false,
  };
}

export default MainPage;
