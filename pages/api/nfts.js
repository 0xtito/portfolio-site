import { MongoClient } from "mongodb";

const DB_PW = process.env.MONGO_PW;

export default async (req, res) => {
  try {
    const clientNft = await MongoClient.connect(
      `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/images?retryWrites=true&w=majority`
    );

    const dbNft = clientNft.db();

    const nftsCollection = dbNft.collection("nfts");
    const pudgyCollection = dbNft.collection("pudgy");

    const nftsDB = await nftsCollection.find().toArray();
    const pudgy = await pudgyCollection.findOne();

    const pudgyImg = pudgy.rawMetadata.image;

    clientNft.close();

    const nfts = nftsDB.map((nft) => ({
      title: nft.name,
      id: nft.id,
      order: nft.order,
      isAnimated: nft.isAnimated,
      imageUrl: !nft.isAnimated ? nft.metadata.image : null,
      animationUrl: nft.isAnimated ? nft.metadata.animation_url : null,
    }));

    res.json({ nfts, pudgyImg });
  } catch (e) {
    console.error(e);
  }
};
