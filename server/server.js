const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
let getNfts = require("./getNfts.js");
const path = require('path')

// console.log(kafka_gif)

dotenv.config();

const PORT = process.env.PORT | 3001;
let nfts = {};

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

  // nfts.nft28.metadata.animation_url =

  // console.log(path.join(__dirname, 'atlanta.gif'))

  app.get("/api/nfts", (req, res) => {
    res.json({nfts, orderNfts});
  });

  app.get("/api/gifs", (req, res) => {
    let imageIds = [];

    Object.values(nfts).forEach( (info) => {
      if (info.isAnimated) {
        imageIds.push({name: info.name.split(' ')[0].toLowerCase(), id: info.id})
      }
    })

    res.send(imageIds);
  });

  app.get("/api/gifs/:id", (req,res) => {
    const filePath = path.join(process.cwd(), 'images', 'gifs', `${req.params.id}.gif`)
    res.sendFile(filePath)
  })
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
