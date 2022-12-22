const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
let getNfts = require("./getNfts.js");
dotenv.config();

const PORT = process.env.PORT | 3001;
let nfts;

// this essentially allows for cross-origin requests from the origin 8080
let corsOptions = {
  origin: "http://localhost:8080",
};

const app = express();

app.use(cors(corsOptions));

(async function getData() {
  allNfts = await getNfts();
  return [allNfts.ownedNfts, allNfts.totalCount];
})().then((res) => {
  const [ownedNfts, totalNfts] = res;
  const orderNfts = true;
  let nfts = {};
  // for simplicity sake, the two variables below will be hard-coded.
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
  ]

  for (let i = 0; i < totalNfts; i++) {
    let nft = ownedNfts[i];

    if (
      unwantedNfts.includes(nft.contract.name) ||
      unwantedNfts.includes(nft.name) ||
      unwantedNfts.includes(nft.title) ||
      nft.contract.address == ensAddress
    ) continue;

    nfts[`nft${i}`] = {
      name: nft.title,
      id: i,
      order: orderByTitle.includes(nft.title) ? orderByTitle.indexOf(nft.title) : -1,
      isAnimated: nft.rawMetadata.animation_url ? true : false,
      contract: nft.contract,
      metadata: nft.rawMetadata,
    };

  }

  // console.log(nfts)

  app.get("/api/nfts", (req, res) => {
    res.json({nfts, orderNfts});
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
