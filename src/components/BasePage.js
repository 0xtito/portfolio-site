import { Fragment } from "react";
import React from "react";

import ChooseFromList from "./ChooseFromList";
import ShowNfts from "./ShowNfts";
import Title from "./Title";

function BasePage(props) {
  let { descriptions, intro, nfts, pudgyImg, selectedTitle, fromRoot } = props;

  return (
    <Fragment>
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
        selectedTitle={selectedTitle}
        fromRoot={fromRoot}
      ></ChooseFromList>
    </Fragment>
  );
}

export default BasePage;
