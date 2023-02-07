import React, { Fragment } from "react";
import { get } from "@vercel/edge-config";
import path from "path";

import ChooseFromList from "../components/ChooseFromList";

function MainPage({ titles }) {
  return (
    <Fragment>
      <ChooseFromList titles={titles} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const descriptions = await get("descriptions");
  const intro = await get("intro");
  const { carousel, pudgy } = await get("images");

  return {
    props: {
      titles: descriptions.map(({ title }) => title),
      intro,
      nfts: carousel.map((nft) => ({
        title: nft.name,
        isAnimated: nft.isAnimated,
        imageUrl: !nft.isAnimated ? nft.image : null,
        animationUrl: nft.isAnimated ? nft.animationUrl : null,
      })),
      defaultNft: carousel[0].image,
      pudgyImg: pudgy.image,
    },
    revalidate: 1,
  };
}

export default MainPage;
