import { Fragment } from "react";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LRU from "lru-cache";

import ChooseFromList from "./ChooseFromList";
import ShowNfts from "./ShowNfts";
// import Description from "../src/components/Description";
import Title from "./Title";
import DisplayDescription from "./DisplayDescription";
import localforage from "localforage";


const cache = new LRU({ max: 4 });
// console.log(localStorage);

function BasePage(props) {
  let { descriptions, intro, nfts, pudgyImg } = props;
  const [showDescription, setShowDescription] = useState(false);
  const [isCacheSet, setIsCacheSet] = useState(false);
  //   const [currentlySelected, setCurrentlySelected] = useState(null);
  const router = useRouter();
  const { title } = router.query;
  //   console.log(localStorage);

  //   if (typeof localStorage != "undefined") {
  //     localStorage.setItem("cache", JSON.stringify(props));
  //     setIsCacheSet(true);
  //   }

  const handleBack = (e) => {
    if (showDescription == true) {
      setShowDescription(false);
    }
    setShowDescription(!showDescription);
    console.log(e);
    console.log("pressed");
  };

  return (
    <Fragment>
      <Head>
        <title>0xtito</title>
        <meta name="Porfolio" content="check out my website" />
      </Head>
      {/* <div grid-column="1"></div> */}
      <img className="pudgy" src={pudgyImg}></img>
      <div className="intro_content content_width">{intro}</div>
      <ShowNfts nfts={nfts}></ShowNfts>
      <Title
        title="0xtito"
        titleWithHover="0xtito.eth"
        phrase="'Not Today'"
      ></Title>
      <ChooseFromList
        descriptions={JSON.stringify(descriptions)}
        onClick={handleBack}
      ></ChooseFromList>
      {/* {title ? (
        <DisplayDescription
          selectedDescription={descriptions.filter((des) => des.title == title)}
          isVisible={true}
        />
      ) : null} */}
    </Fragment>
  );
}

export default BasePage;
