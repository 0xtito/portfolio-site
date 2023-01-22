import "../src/index.css";

import ShowNfts from "../src/components/ShowNfts";
import { useEffect, useState } from "react";
import { setLazyProp } from "next/dist/server/api-utils";
// import axios;

/**
 * TODO: Make it so the nfts load in at the same time
 * as the rest of the app through SSG
 */

function PortfolioSite({ Component, pageProps }) {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   pageProps.nfts ? setLoading(false) : null;
  // }, [pageProps]);

  const filterNfts = (nfts) => {
    // find pudgy and remove
    for (let i = 0; i < nfts.length; i++) {
      if (nfts[i].name == "Lil Pudgy #4495") {
        let index = nfts.indexOf(nfts[i]);
        nfts.splice(index, 1);
        break;
      }
    }
    // order NFTs
    nfts.sort((a, b) => {
      let orderOfA = a.order;
      let orderOfB = b.order;

      return orderOfA - orderOfB;
    });

    return nfts;
  };
  // if (loading) return null;

  return (
    <div className="content-container content-grid">
      <Component {...pageProps} />
      <ShowNfts nfts={pageProps.nfts ? filterNfts(pageProps.nfts) : null} />
    </div>
  );
}

export async function getStaticProps() {
  const DB_PW = process.env.MONGO_PW;

  const clientNft = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/images?retryWrites=true&w=majority`
  );

  const dbNft = clientNft.db();

  const nftsCollection = dbNft.collection("nfts");

  const nfts = await nftsCollection.find().toArray();

  return {
    props: {
      nfts: nfts.map((nft) => ({
        title: nft.name,
        id: nft.id,
        order: nft.order,
        isAnimated: nft.isAnimated,
        imageUrl: !nft.isAnimated ? nft.metadata.image : null,
        animationUrl: nft.isAnimated ? nft.metadata.animation_url : null,
      })),
    },
    revalidate: false,
  };
}

export default PortfolioSite;
