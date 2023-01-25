import React, { Fragment, useMemo, memo, useContext, useState } from "react";
import _ from "lodash";
import Image from "next/image";

import ChooseFromList from "./ChooseFromList";
import Title from "./Title";
import { NftsContext } from "./contexts/NftsContext";
// import ShowNfts from "./ShowNfts";
import { Consumer } from "./contexts/NftsContext";

const pudgyImgDefault = "https://api.pudgypenguins.io/lil/image/4495";

function BasePage(props) {
  // const context = useContext(NftsContext);
  let { descriptions, intro, pudgyImg1, nfts, selectedTitle } = props;
  const [pudgyImg, setPudgyImage] = useState(pudgyImgDefault);

  return (
    <Fragment>
      <Consumer>
        {(pudgyImg) => (
          <Image
            width={75}
            height={75}
            className="pudgy"
            alt="lil pudgy"
            // loader={() => pudgyImg}
            unoptimized
            src={pudgyImg}
          ></Image>
        )}
      </Consumer>
      <div className="intro_content content_width">{intro}</div>
      <Title
        title="0xtito"
        titleWithHover="0xtito.eth"
        phrase="'Not Today'"
      ></Title>
      <ChooseFromList
        descriptions={JSON.stringify(descriptions)}
        selectedTitle={selectedTitle}
      ></ChooseFromList>
    </Fragment>
  );
}

export default BasePage;
