import React, { useEffect, useRef, useState } from "react";

const url = process.env.SERVER_URL;

const defaultImage = require("../../images/default_image.png").default;

let pudgy;
let resNfts, gifs, resImg;
let gifsArr, finalGifs;

function ShowNfts(props) {
  const nfts = props.nfts;

  const [name, setName] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [image, setImage] = useState(null);
  const [gif, setGifs] = useState(null);
  const [animation, setAnimation] = useState(null);
  const [caption, setCaption] = useState(null);
  const curCaption = useRef();

  // let sentPudgy
  let curNft = 0;

  let header = new Headers({
    "Access-Control-Allow-Origin": "*",
  });

  useEffect(() => {
    // let nfts;
    let curNft = 0;
    async function fetchData() {
      try {
        // resNfts = await fetch(`${url}/nfts`, {
        //   method: "GET",
        // });
        // let { nfts: nftsObj, orderNfts } = await resNfts.json();

        // gifs = await fetch(`${url}/gifs`, {
        //   method: "GET",
        // });
        // gifs = await gifs.json();

        // let gifPromises = gifs.map(async (obj) => {
        //   return fetch(`${url}/gifs/${obj.name}`);
        //   // return [await fetch(`${url}/gifs/${obj.name}`), obj]
        // });
        // let resGifsUrls = await Promise.all(gifPromises);

        // // put the urls in resGifsUrls into resGifNames
        // gifs.forEach((obj, i) => {
        //   obj.url = resGifsUrls[i].url;
        // });

        // nfts = filterNfts(nftsObj, orderNfts);
        setName(nfts[0].title);
        setImage(nfts[0].imageUrl);
        curCaption.current = name;

        setTimeout(() => {
          curNft++;
          showNfts(nfts);
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

    function showNfts(nfts) {
      let pauseTime = 3000;
      if (curNft == nfts.length) {
        curNft = 0;
      }
      setName(nfts[curNft].title);
      curCaption.current = name;
      if (nfts[curNft].isAnimated) {
        pauseTime = 5000;
        setImage(nfts[curNft].animationUrl)
      } else {
        setImage(nfts[curNft].imageUrl);
      }

      curNft++;
      setTimeout(() => {
        showNfts(nfts);
      }, pauseTime);
    }
  }, []);

  return (
    <div className="image-container">
      {/* <a> */}
      <img
        className="nft-image"
        src={image}
        onMouseOver={(e) => {
          let image = e.currentTarget;
          let parent = image.parentElement;
          let children = parent.children;
          for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.classList.contains("hide-caption")) {
              child.classList.replace("hide-caption", "show-caption");
              // setName(name);
            }
          }
        }}
        onMouseLeave={(e) => {
          let image = e.currentTarget;
          let parent = image.parentElement;
          // let children = parent.childNodes;
          let children = parent.children;
          for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.classList.contains("show-caption")) {
              child.classList.replace("show-caption", "hide-caption");
            }
          }
        }}
      ></img>
      {/* </a> */}
      <p className="image-title hide-caption">{!name ? "" : name}</p>
    </div>
  );
}

function filterNfts(nftsObj, isOrdered) {
  let rawNftsArr = Object.values(nftsObj);

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
    if (!nft.isAnimated) {
      if (nft.metadata.image.startsWith("ipfs")) {
        let key = nft.metadata.image.split("//")[1];
        nft.metadata.image = `https://ipfs.io/ipfs/${key}`;
      }
    } else {
      if (gifs.some((info) => info.id == nft.id)) {
        let el = gifs.find((info) => info.id == nft.id);
        console.log('hey')
        nft.metadata.animation_url = el.url;
      }
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

export default ShowNfts;
