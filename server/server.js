const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
let getNfts = require("./getNfts.js");
const path = require("path");

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
  ];

  let pudgy;

  for (let i = 0; i < totalNfts; i++) {
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

    nfts[`nft${i}`] = {
      name: nft.title,
      id: i,
      order: orderByTitle.includes(nft.title)
        ? orderByTitle.indexOf(nft.title)
        : -1,
      isAnimated: nft.rawMetadata.animation_url ? true : false,
      contract: nft.contract,
      metadata: nft.rawMetadata,
    };
  }

  app.get("/api/nfts", (req, res) => {
    res.json({ nfts, orderNfts });
  });

  app.get("/api/nfts/pudgy", (req, res) => {
    res.json(pudgy);
  });

  app.get("/api/gifs", (req, res) => {
    let imageIds = [];

    Object.values(nfts).forEach((info) => {
      if (info.isAnimated) {
        imageIds.push({
          name: info.name.split(" ")[0].toLowerCase(),
          id: info.id,
        });
      }
    });

    res.send(imageIds);
  });

  app.get("/api/text/description-text", (req, res) => {
    const textMap = {
      past: {
        text: 'This is the text for the "past" list item. This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.',
        isClicked: false,
      },
      current: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Mattis enim ut tellus elementum sagittis vitae et. Posuere ac ut consequat semper viverra nam. Purus faucibus ornare suspendisse sed nisi lacus sed viverra. Posuere ac ut consequat semper viverra nam libero justo laoreet. Praesent tristique magna sit amet purus. \nSed odio morbi quis commodo odio aenean sed. Orci sagittis eu volutpat odio facilisis mauris sit amet. Odio ut sem nulla pharetra diam sit. Pharetra magna ac placerat vestibulum lectus mauris ultrices. \n\n\nFaucibus vitae aliquet nec ullamcorper sit amet risus nullam. Eget mi proin sed libero. Tincidunt nunc pulvinar sapien et ligula. Est placerat in egestas erat imperdiet sed. Arcu non sodales neque sodales ut.",
        isClicked: false,
      },
      future: {
        text: 'This is the text for the "future" list item.',
        isClicked: false,
      },
      interests: {
        text: 'This is the text for the "interests" list item.',
        isClicked: false,
      },
    };

    res.json(textMap);
  });

  app.get("/api/text/intro", (req, res) => {
    const intro =
      "I grew up in South Florida playing sports and always being with friends. I went to Saint Andrew’s High School for academics and lacrosse. After an amazing 4 years, I went to Lehigh University to study Mechanical Engineering, however, two years in, I realized and accepted that I had no idea what I wanted to do with my life, but becoming a mechanical engineer and growing deeper in debt was the only thing I was certain I was not going to do. After leaving, I spent the next few years soul searching between jobs and hobbies, and ultimately ended up entangled in the world of crypto and software engineering. Now I spend my days coding, teaching children how to code, and learning all I can about whatever interests me.";
    res.json(intro);
  });

  app.get("/api/text/title-content", (req, res) => {
    const content = {
      name: "0xtito",
      nameWithEth: "0xtito.eth",
    };
    res.json(content);
  });

  app.get("/api/phrase", (req, res) => {
    const phrase = '"not today"';
    res.json(phrase);
  });

  app.get("/api/gifs/:id", (req, res) => {
    const filePath = path.join(
      process.cwd(),
      "images",
      "gifs",
      `${req.params.id}.gif`
    );
    res.sendFile(filePath);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
