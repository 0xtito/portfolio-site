import Head from "next/head";
import path from "path";
import { MongoClient } from "mongodb";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";
import localforage from "localforage";

import DisplayDescription from "../../src/components/DisplayDescription";
import BasePage from "../../src/components/BasePage";

function DescriptionData(props) {
  let { descriptions, intro, nfts, pudgyImg, selectedDescription, fromRoot } =
    props;

  if (typeof window !== "undefined") handleStorage(descriptions);

  return (
    <div className="content-container content-grid">
      <Head>
        <title>{selectedDescription.title}</title>
        <meta name="home" lang="en" content="portfolio site" />
      </Head>
      <BasePage
        descriptions={descriptions}
        intro={intro}
        nfts={nfts}
        pudgyImg={pudgyImg}
        selectedTitle={selectedDescription.title}
        fromRoot={fromRoot}
      />
      <DisplayDescription selectedDescription={selectedDescription} />
    </div>
  );
}

export async function getStaticPaths() {
  // const url = process.env.SERVER_URL;
  // const descriptionFilePath = path.join(url, "api", "descriptions");

  const DB_PW = process.env.MONGO_PW;

  const clientDescription = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/descriptionsDB?retryWrites=true&w=majority`
  );

  const dbDescription = clientDescription.db();
  const descriptionCollection = dbDescription.collection("descriptions");

  const descriptions = await descriptionCollection.find().toArray();

  return {
    fallback: false,
    paths: descriptions.map((des) => ({
      params: { descriptionTitle: des.title },
    })),
  };
}

export async function getStaticProps(context) {
  const title = context.params.descriptionTitle;

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
  const pudgy = await pudgyCollection.findOne();

  const selectedDes = await descriptionCollection
    .find({
      title: title,
    })
    .toArray();

  const selectedDescription = selectedDes[0];

  clientDescription.close();
  clientNft.close();

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
      pudgyImg: pudgy.rawMetadata.image,
      selectedDescription: {
        title: selectedDescription.title,
        description: selectedDescription.description,
      },
      fromRoot: false,
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
  } else {
    console.log("already stored");
  }
}

export default DescriptionData;
