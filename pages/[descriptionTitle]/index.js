import Head from "next/head";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import { Fragment } from "react";

import DisplayDescription from "../../src/components/DisplayDescription";
import BasePage from "../../src/components/BasePage";
import MainPage from "../index";

function DescriptionData(props) {
  const router = useRouter();
  let { descriptions, intro, nfts, pudgyImg } = props;

  const selectedDescription = router.query.descriptionTitle;

  return (
    <Fragment>
      <Head>
        <title>{selectedDescription.title}</title>
        <meta name="home" lang="en" content="portfolio site" />
      </Head>
      <BasePage
        descriptions={descriptions}
        intro={intro}
        nfts={nfts}
        pudgyImg={pudgyImg}
        selectedTitle={selectedDescription.title}
      />
      <DisplayDescription
        selectedTitle={selectedDescription}
        descriptions={descriptions}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const DB_PW = process.env.MONGO_PW;

  const clientDescription = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/descriptionsDB?retryWrites=true&w=majority`
  );

  const dbDescription = clientDescription.db();
  const descriptionCollection = dbDescription.collection("descriptions");

  const descriptions = await descriptionCollection.find().toArray();

  return {
    fallback: "blocking",
    paths: descriptions.map((des) => ({
      params: { descriptionTitle: des.title },
    })),
  };
}

export async function getStaticProps(context) {
  const title = context.params.descriptionTitle;

  const DB_PW = process.env.MONGO_PW;

  const clientDescription = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/descriptionsDB?retryWrites=true&w=majority`
  );

  const clientNft = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/images?retryWrites=true&w=majority`
  );

  const dbDescription = clientDescription.db();
  const dbNft = clientNft.db();

  const descriptionCollection = dbDescription.collection("descriptions");
  const introCollection = dbDescription.collection("intro");
  const nftsCollection = dbNft.collection("nfts");
  const pudgyCollection = dbNft.collection("pudgy");

  const descriptions = await descriptionCollection.find().toArray();
  const nfts = await nftsCollection.find().toArray();
  const intro = await introCollection.findOne();
  const pudgy = await pudgyCollection.findOne();

  const selectedDes = await descriptionCollection
    .find({
      title: title,
    })
    .toArray();

  const selectedDescription = selectedDes[0];

  clientDescription.close();
  clientNft.close();

  return {
    props: {
      descriptions: descriptions.map((des) => ({
        title: des.title,
        description: des.description,
      })),
      intro: intro.intro,
      nfts: nfts.map((nft) => ({
        title: nft.name,
        id: nft.id,
        order: nft.order,
        isAnimated: nft.isAnimated,
        imageUrl: !nft.isAnimated ? nft.metadata.image : null,
        animationUrl: nft.isAnimated ? nft.metadata.animation_url : null,
      })),
      pudgyImg: pudgy.rawMetadata.image,
      selectedDescription: {
        title: selectedDescription.title,
        description: selectedDescription.description,
      },
      init: true,
    },
    revalidate: 1,
  };
}

export default DescriptionData;
