import { useRouter } from "next/router";
import { Fragment } from "react";
import { get } from "@vercel/edge-config";

import DisplayDescription from "../../components/DisplayDescription";
import ChooseFromList from "../../components/ChooseFromList";

function DescriptionData({ titles }) {
  return (
    <Fragment>
      <ChooseFromList titles={titles} />
      <DisplayDescription />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const descriptions = await get("descriptions");

  return {
    fallback: false,
    paths: descriptions.map(({ title }) => ({
      params: { descriptionTitle: title },
    })),
  };
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

export default DescriptionData;
