import { MongoClient } from "mongodb";
// import ChooseFromList from "../../src/components/ChooseFromList";
import DisplayDescription from "../../src/components/DisplayDescription";
import BasePage from "../../src/components/BasePage";
import { Fragment, useEffect, useState, useRef, useLayoutEffect } from "react";
import LRU from "lru-cache";
import localforage from "localforage";

const DB_PW = process.env.MONGO_PW;
// const cache = new LRU({ max: 4 });

function DescriptionData(props) {
  const [mainData, setMainData] = useState({
    descriptions: {},
    intro: "",
    nfts: {},
    pudgyImg: "",
  });
  const [selectedListItem, setSelectedListItem] = useState({
    title: "hey",
    description: "hey",
  });
  const [initData, setInitData] = useState(false);
  const [initDescription, setInitDescription] = useState(false);
  let { descriptions, intro, nfts, pudgyImg, selectedDescription, isVisible } =
    props;

  // useEffect(() => {
  //   async function getData() {
  //     const _data = await localforage.getItem("globalProps");
  //     setMainData(_data);
  //     setInitData(true)
  //   }

  //   async function getDescription() {
  //     const _data = await localforage.getItem("selectedTotalDescription");
  //     console.log(`inside getDescription`, _data)
  //     setSelectedListItem(_data);
  //     if (_data.title == "") {
  //       setInitDescription(false)
  //     } else {
  //       setInitDescription(true);
  //     }
  //   }
  //   getData();
  //   getDescription()
  //   // const _data = cache.calculatedSize;
  //   // console.log(_data);
  //   // setData(_data);
  // }, []);

  useLayoutEffect(() => {
    async function getData() {
      const _data = await localforage.getItem("globalProps");
      setMainData(_data);
      setInitData(true)
    }

    async function getDescription() {
      const _data = await localforage.getItem("selectedTotalDescription");
      console.log(`inside getDescription`, _data)
      setSelectedListItem(_data);
      if (_data.title == "") {
        setInitDescription(false)
      } else {
        setInitDescription(true);
      }
    }
    getData();
    getDescription()
    // const _data = cache.calculatedSize;
    // console.log(_data);
    // setData(_data);
  }, []);

  return (
    <Fragment>
      {console.log(initData, initDescription)}
      {initData && initDescription ? (
        <div className="content-container content-grid">
          <BasePage
            descriptions={mainData.descriptions}
            intro={mainData.intro}
            nfts={mainData.nfts}
            pudgyImg={mainData.pudgyImg}
            isRoot={false}
            testData={initData}
          />
          <DisplayDescription
            selectedDescription={{title: selectedListItem.title, description: selectedListItem.description}}
            isVisible={true}
          />
        </div>
      ) : (
        <div className="content-container content-grid">
          <BasePage
            descriptions={descriptions}
            intro={intro}
            nfts={nfts}
            pudgyImg={pudgyImg}
            isRoot={false}
            testData={initData}
          />
          <DisplayDescription
            selectedDescription={selectedDescription}
            isVisible={isVisible}
          />
        </div>
      )}
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/descriptionsDB?retryWrites=true&w=majority`
  );
  const db = client.db();

  const descriptionCollection = db.collection("descriptions");

  const descriptions = await descriptionCollection
    .find({}, { title: "" })
    .toArray();

  client.close();

  return {
    fallback: false,
    paths: descriptions.map((des) => ({
      params: { descriptionTitle: des.title },
    })),
  };
}

// const dbDescription = clientDescription.db();
// const dbNft = clientNft.db();

// const descriptionCollection = dbDescription.collection("descriptions");
// const introCollection = dbDescription.collection("intro");
// const nftsCollection = dbNft.collection("nfts");
// const pudgyCollection = dbNft.collection("pudgy");

// const descriptions = await descriptionCollection.find().toArray();
// const nfts = await nftsCollection.find().toArray();
// const intro = await introCollection.findOne();
// const pudgy = await pudgyCollection.findOne();

// clientDescription.close();
// clientNft.close();

// return {
//   props: {
//     descriptions: descriptions.map((des) => ({
//       title: des.title,
//       description: des.description,
//     })),
//     intro: intro.intro,
//     nfts: nfts.map((nft) => ({
//       title: nft.name,
//       id: nft.id,
//       order: nft.order,
//       isAnimated: nft.isAnimated,
//       imageUrl: !nft.isAnimated ? nft.metadata.image : null,
//       animationUrl: nft.isAnimated ? nft.metadata.animation_url : null,
//     })),
//     pudgyImg: pudgy.rawMetadata.image,
//   },
//   revalidate: 1,
// };

export async function getStaticProps(context) {
  const title = context.params.descriptionTitle;
  // console.log(context);

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
      isVisible: selectedDescription.title != "" ? true : false,
      test: 'test'
    },
    revalidate: 1000,
  };
}

export default DescriptionData;
