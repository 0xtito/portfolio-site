import { useRouter } from "next/router";
import { Fragment } from "react";
import { get } from "@vercel/edge-config";

import DisplayDescription from "../../components/DisplayDescription";
import ChooseFromList from "../../components/ChooseFromList";

function DescriptionData({ descriptions, titles, selectedDescription }) {
  const router = useRouter();

  const activeTitle = router.query.descriptionTitle;

  return (
    <Fragment>
      <ChooseFromList titles={titles} />
      <DisplayDescription
        selectedTitle={activeTitle}
        descriptions={descriptions}
        selectedDescription={selectedDescription}
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

export async function getStaticProps(context) {
  const activeTitle = context.params.descriptionTitle;
  const apiUrl = process.env.VERCEL_ENV
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const images = await fetch(`${apiUrl}/api/nfts`);
    console.log(images);
    const { carousel, pudgy } = await images.json();
    console.log(pudgy);
    const content = await fetch(`${apiUrl}/api/content`);
    console.log(content);
    const { descriptions, intro } = await content.json();
    console.log(intro);
    return {
      props: {
        descriptions: descriptions.map(({ description, title }) => ({
          title,
          description,
        })),
        selectedDescription: descriptions.filter(
          ({ title }) => title == activeTitle
        ),
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
}

export default DescriptionData;
