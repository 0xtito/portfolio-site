// import { MongoClient } from "mongodb";
const { MongoClient} = require("mongodb");
const { Binary } = require('bson');
const fs = require('fs');
const path = require("path");
const { Network, Alchemy } = require("alchemy-sdk");
const address = "0xD2128b1C22Bb80a4dae69fe149cD6fE9Ba7eB4aa";
const apiKey = process.env.API_KEY;
const DB_PW = process.env.MONGO_PW;


const settings = {
  apiKey: apiKey,
  Network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const filePathAtlanta = path.join(process.cwd(), 'images', 'gifs', 'atlanta.gif');
const filePathKafka = path.join(process.cwd(), 'images', 'gifs', 'kafka.gif');


function getNfts() {
  return alchemy.nft.getNftsForOwner(address);
}

const ensAddress = "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85";
let unwantedNfts = [
  "PhunkyDoodles",
  "Bored Ape Comic",
  "RibBits",
  "tinyfrens.eth",
  "TheGoldenPups",
  "Scientists",
  "Red Slumdoge",
  "Galaxy-Warriors",
  "TheMerge",
  " Alpha #19",
];
let orderByTitle = [
  "lonely nights",
  "Flowers #6098",
  "Atlanta #1059",
  "nobody",
  "KID CUDI²",
  "Kafka #468",
  "Galaxy Egg #9667",
  "Galaxy Egg #1002",
];

// /api/get-descriptions

async function addNftsToDB() {
  // const data = req.body;
  const client = await MongoClient.connect(
    `mongodb+srv://tito_admin:${DB_PW}@portfolio.kd4jadd.mongodb.net/images?retryWrites=true&w=majority`
  );
  const db = client.db();
  const nftsCollection = db.collection("nfts");
  const gifCollection = db.collection("gifs");
  const pudgyCollection = db.collection("pudgy")
  let pudgy;

  // const {title, description} = data;

  let nftArr = [];

  if ((await nftsCollection.estimatedDocumentCount()) == 0) {
    let nfts = await alchemy.nft.getNftsForOwner(address);
    let ownedNfts = nfts.ownedNfts;
    let totalCount = nfts.totalCount;
    // console.log(nfts)

    for (let i = 0; i < totalCount; i++) {
      let nft = ownedNfts[i];

      if (nft.title == "Lil Pudgy #4495") {
        pudgy = nft;
      }
      if (
        unwantedNfts.includes(nft.contract.name) ||
        unwantedNfts.includes(nft.name) ||
        unwantedNfts.includes(nft.title) ||
        nft.contract.address == ensAddress
      )
        continue;

      nftArr.push({
        name: nft.title,
        id: i,
        order: orderByTitle.includes(nft.title)
          ? orderByTitle.indexOf(nft.title)
          : -1,
        isAnimated: nft.rawMetadata.animation_url ? true : false,
        contract: nft.contract,
        metadata: nft.rawMetadata,
      });

    }

    const finalNftArr = filterNfts(nftArr, true);


    // nftsCollection.insertOne({id: subty })
    // console.log(nftArr);
    const result = await nftsCollection.insertMany(finalNftArr);
    const pudgyResult = await pudgyCollection.insertOne(pudgy);
  } else {
    console.log("nfts already added");
  }
  client.close();
}

function filterNfts(_rawNftsArr, isOrdered) {
  // let rawNftsArr = Object.values(nftsObj);
  let rawNftsArr = _rawNftsArr;

  // find pudgy and remove
  for (let i = 0; i < rawNftsArr.length; i++) {
    if (rawNftsArr[i].name == "Lil Pudgy #4495") {
      pudgy = rawNftsArr[i];
      let index = rawNftsArr.indexOf(rawNftsArr[i]);
      rawNftsArr.splice(index, 1);
      break;
    }
  }
  // give the NFTs the correct links
  for (let nft of rawNftsArr) {
    if (!nft.isAnimated && nft.metadata.image.startsWith("ipfs")) {
      let key = nft.metadata.image.split("//")[1];
      nft.metadata.image = `https://ipfs.io/ipfs/${key}`;
    } 
  }
  // order NFTs
  if (isOrdered) {
    rawNftsArr.sort((a, b) => {
      let orderOfA = a.order;
      let orderOfB = b.order;

      return orderOfA - orderOfB;
    });
  }
  return rawNftsArr;
}

addNftsToDB();
