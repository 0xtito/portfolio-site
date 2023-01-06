import { MongoClient } from "mongodb";
import { Fragment } from "react";
import React, { useEffect, useState } from "react";
import Head from "next/head";

import ChooseFromList from "../src/components/ChooseFromList";
import ShowNfts from "../src/components/ShowNfts";
import Description from "../src/components/Description";
import Title from "../src/components/Title";
import DisplayDescription from "../src/components/DisplayDescription";

const DB_PW = process.env.MONGO_PW;

function MainPage(props) {
  const [showDescription, setShowDescription] = useState(true);
  const [currentlySelected, setCurrentlySelected] = useState(null)
  // const { nftsJsx } = ShowNfts();
  console.log(props);

  const handleBack = (e) => {
    if (showDescription == true) {
      setShowDescription(false);
    }
    setShowDescription(!showDescription);
    console.log(e)
    console.log("pressed");
  };

  return (
    <Fragment>
      <Head>
        <title>0xtito</title>
        <meta name="Porfolio" content="check out my website" />
      </Head>
      <div className="content-container content-grid">
        {/* <div grid-column="1"></div> */}
        <img className="pudgy" src={props.pudgyImg}></img>
        <div className="intro_content content_width">{props.intro}</div>
        <ShowNfts nfts={props.nfts}></ShowNfts>
        <Title
          title="0xtito"
          titleWithHover="0xtito.eth"
          phrase="'Not Today'"
        ></Title>
        <ChooseFromList
          descriptions={JSON.stringify(props.descriptions)}
          onClick={handleBack}
        ></ChooseFromList>
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  // whatever is gotten here will never show up on the client side
  // moving to server side (precisely, during build time)
  // fetch data from an API

  const clientDescription = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/descriptionsDB?retryWrites=true&w=majority`
  );
  const clientNft = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/images?retryWrites=true&w=majority`
  );
  const dbDepscription = clientDescription.db();
  const dbNft = clientNft.db();

  const descriptionCollection = dbDepscription.collection("descriptions");
  const introCollection = dbDepscription.collection("intro");
  const nftsCollection = dbNft.collection("nfts");
  const pudgyCollection = dbNft.collection("pudgy");


  const descriptions = await descriptionCollection.find().toArray();
  const nfts = await nftsCollection.find().toArray();
  const intro = await introCollection.findOne();
  const pudgy = await pudgyCollection.findOne();


  clientDescription.close();
  clientNft.close();

  return {
    props: {
      descriptions: descriptions.map((des) => ({
        title: des.title,
        description: des.description,
        isClicked: des.isClicked,
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
      showDescription: false,
    },
    revalidate: 1,
  };
}

export default MainPage;
