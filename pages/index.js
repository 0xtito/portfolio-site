import React, { Fragment } from "react";
import { get } from "@vercel/edge-config";

import ChooseFromList from "../src/components/ChooseFromList";

function MainPage({ descriptions }) {
  return (
    <Fragment>
      <ChooseFromList descriptions={descriptions} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const descriptions = await get("descriptions");
  const intro = await get("intro");
  const { carousel, pudgy } = await get("images");

  // descriptions.map(({ title }) => title);

  return {
    props: {
      descriptions: descriptions.map(({ description, title }) => ({
        title,
        description,
      })),
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
