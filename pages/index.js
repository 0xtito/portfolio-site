import { MongoClient } from "mongodb";
import { Fragment } from "react";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LRU from "lru-cache";

import ChooseFromList from "../src/components/ChooseFromList";
import ShowNfts from "../src/components/ShowNfts";
import Description from "../src/components/Description";
import Title from "../src/components/Title";
import DisplayDescription from "../src/components/DisplayDescription";
import BasePage from "../src/components/BasePage";

const DB_PW = process.env.MONGO_PW;
const cache = new LRU({ max: 4 });

function MainPage(props) {
  let { descriptions, intro, nfts, pudgyImg } = props;

  const [showDescription, setShowDescription] = useState(false);
  const [currentlySelected, setCurrentlySelected] = useState(null);
  const router = useRouter();
  const { title } = router.query;

  const handleBack = (e) => {
    if (showDescription == true) {
      setShowDescription(false);
    }
    setShowDescription(!showDescription);
    console.log(e);
    console.log("pressed");
  };

  return (
    <div className="content-container content-grid">
      <BasePage
        descriptions={descriptions}
        intro={intro}
        nfts={nfts}
        pudgyImg={pudgyImg}
      />
    </div>

    // <Fragment>
    //   <Head>
    //     <title>0xtito</title>
    //     <meta name="Porfolio" content="check out my website" />
    //   </Head>
    //   <div className="content-container content-grid">
    //     {/* <div grid-column="1"></div> */}
    //     <img className="pudgy" src={pudgyImg}></img>
    //     <div className="intro_content content_width">{intro}</div>
    //     <ShowNfts nfts={nfts}></ShowNfts>
    //     <Title
    //       title="0xtito"
    //       titleWithHover="0xtito.eth"
    //       phrase="'Not Today'"
    //     ></Title>
    //     <ChooseFromList
    //       descriptions={JSON.stringify(descriptions)}
    //       onClick={handleBack}
    //     ></ChooseFromList>
    //     {title ? (
    //       <DisplayDescription
    //         selectedDescription={descriptions.filter(
    //           (des) => des.title == title
    //         )}
    //         isVisible={true}
    //       />
    //     ) : null}
    //   </div>
    // </Fragment>
  );
}

function saveToCache({ descriptions, intro, nfts, pudgyImg }) {
  cache.set("descriptions", descriptions);
  cache.set("intro", intro);
  cache.set("nfts", nfts);
  cache.set("pudgyImg", pudgyImg);
  return cache;
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

  clientDescription.close();
  clientNft.close();

  cache.set(
    "descriptions",
    descriptions.map((des) => ({
      title: des.title,
      description: des.description,
    }))
  );
  cache.set("intro", intro.intro);
  cache.set(
    "nfts",
    nfts.map((nft) => ({
      title: nft.name,
      id: nft.id,
      order: nft.order,
      isAnimated: nft.isAnimated,
      imageUrl: !nft.isAnimated ? nft.metadata.image : null,
      animationUrl: nft.isAnimated ? nft.metadata.animation_url : null,
    }))
  );
  cache.set("pudgyImg", pudgy.rawMetadata.image);
  console.log(cache.get("descriptions"));

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
    },
    revalidate: 1,
  };
}

export default MainPage;
