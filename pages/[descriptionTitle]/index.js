import { useRouter } from "next/router";
import { Fragment } from "react";
import { get } from "@vercel/edge-config";

import DisplayDescription from "../../src/components/DisplayDescription";
import ChooseFromList from "../../src/components/ChooseFromList";

function DescriptionData({ descriptions }) {
  const router = useRouter();

  const activeTitle = router.query.descriptionTitle;

  return (
    <Fragment>
      <ChooseFromList descriptions={descriptions} />
      <DisplayDescription
        selectedTitle={activeTitle}
        descriptions={descriptions}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const descriptions = await get("descriptions");

  return {
    fallback: "blocking",
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

export default DescriptionData;
