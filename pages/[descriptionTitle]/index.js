import Head from "next/head";
import path from "path";

import DisplayDescription from "../../src/components/DisplayDescription";
import BasePage from "../../src/components/BasePage";

function DescriptionData(props) {
  let { descriptions, intro, nfts, pudgyImg, selectedDescription } = props;

  return (
    <div className="content-container content-grid">
      <Head>
        <title>{selectedDescription.title}</title>
        <meta name="home" content="portfolio site" />
      </Head>
      <BasePage
        descriptions={descriptions}
        intro={intro}
        nfts={nfts}
        pudgyImg={pudgyImg}
        selectedTitle={selectedDescription.title}
      />
      <DisplayDescription selectedDescription={selectedDescription} />
    </div>
  );
}

export async function getStaticPaths() {
  const url = "http://localhost:3000/";
  const descriptionFilePath = path.join(url, "api", "descriptions");

  const desRes = await fetch(descriptionFilePath);
  const { descriptions } = await desRes.json();

  return {
    fallback: false,
    paths: descriptions.map((des) => ({
      params: { descriptionTitle: des.title },
    })),
  };
}

export async function getStaticProps(context) {
  const title = context.params.descriptionTitle;

  const url = "http://localhost:3000/";
  const nftFilePath = path.join(url, "api", "nfts");
  const descriptionFilePath = path.join(url, "api", "descriptions");

  const nftRes = await fetch(nftFilePath);
  const { nfts, pudgyImg } = await nftRes.json();

  const desRes = await fetch(descriptionFilePath);
  const { descriptions, intro } = await desRes.json();

  const selectedDescriptionTotal = descriptions.filter(
    (des) => des.title == title
  )[0];

  return {
    props: {
      descriptions: descriptions.map((des) => ({
        title: des.title,
        description: des.description,
      })),
      intro: intro.intro,
      nfts: nfts,
      pudgyImg: pudgyImg,
      selectedDescription: {
        title: selectedDescriptionTotal.title,
        description: selectedDescriptionTotal.description,
      },
    },
    revalidate: 1,
  };
}

export default DescriptionData;
