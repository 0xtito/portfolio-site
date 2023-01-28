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
  const _apiUrl = process.env.VERCEL_ENV
    ? process.env.VERCEL_URL
    : "http://localhost:3000";
  console.log(process.VERCEL_URL);
  const apiUrl = "https://portfolio-site-13ngakkxa-0xtito.vercel.app/";

  try {
    const images = await fetch(`${apiUrl}/api/nfts`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    const { carousel, pudgy } = await images.json();
    console.log(pudgy);
    const content = await fetch(`${apiUrl}/api/content`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    const { descriptions, intro } = await content.json();
    console.log(intro);

    return {
      props: {
        descriptions: descriptions.map(({ description, title }) => ({
          title,
          description,
        })),
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
  } catch (err) {
    console.error(err.message);
  }

  // const descriptions = await get("descriptions");
  // const intro = await get("intro");
  // const { carousel, pudgy } = await get("images");
}

export default MainPage;
