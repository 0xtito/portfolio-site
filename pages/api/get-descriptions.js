import { MongoClient } from "mongodb";
// const dotenv = require('dotenv');
// dotenv.config();

const DB_PW = process.env.MONGO_PW;


// /api/get-descriptions

async function handler(req, res) {
  if (req.method == 'GET') {
    
    const data = req.body;

    const {title, description} = data;

    const client = await MongoClient.connect(`mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/portfolio?retryWrites=true&w=majority`);
    const db = client.db();

    const descriptionCollection = db.collection('descriptions');

    console.log(descriptionCollection)

    await descriptionCollection.findOne(title)

    client.close();

    res.status(201).json({message: "description retrieved"})
  }
}

export default handler;