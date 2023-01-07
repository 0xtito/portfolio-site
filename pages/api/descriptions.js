import { MongoClient } from "mongodb";

const DB_PW = process.env.MONGO_PW;

export default async (req, res) => {
  try {
    const clientDescription = await MongoClient.connect(
      `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/descriptionsDB?retryWrites=true&w=majority`
    );

    const dbDescription = clientDescription.db();

    const descriptionCollection = dbDescription.collection("descriptions");
    const introCollection = dbDescription.collection("intro");

    const descriptions = await descriptionCollection.find().toArray();
    const intro = await introCollection.findOne();

    clientDescription.close();

    res.json({ descriptions, intro });
  } catch (e) {
    console.error(e);
  }
};
