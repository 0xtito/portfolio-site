import React from "react";

const defaultImage = require("../../images/default_image.png").default;

let pudgy;
let resNfts, gifs, resImg;
let gifsArr, finalGifs;

function ShowNfts() {
  const [name, setName] = React.useState(null);
  const [contractAddress, setContractAddress] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [gif, setGifs] = React.useState(null);
  const [animation, setAnimation] = React.useState(null);


  let url = "http://localhost:3001/api";
  let header = new Headers({
    "Access-Control-Allow-Origin": "*",
  });

  React.useEffect(() => {
    let nfts;
    let curNft = 0
    async function fetchData() {
      try {
        resNfts = await fetch(`${url}/nfts`, {
          method: "GET",
        });
        let { nfts: nftsObj, orderNfts } = await resNfts.json();

        gifs = await fetch(`${url}/gifs`, {
          method: 'GET'
        })
        gifs = await gifs.json()
        console.log(gifs)
        
        let gifPromises = gifs.map( async (obj) => {
          return fetch(`${url}/gifs/${obj.name}`)
          // return [await fetch(`${url}/gifs/${obj.name}`), obj]
        });
        let resGifsUrls = await Promise.all(gifPromises)

        // put the urls in resGifsUrls into resGifNames
        gifs.forEach((obj, i) => {
          obj.url = resGifsUrls[i].url
        })

        nfts = filterNfts(nftsObj, orderNfts);

        setName(nfts[curNft].name);
        setImage(nfts[curNft].metadata.image)

        setTimeout(() => {
          curNft++
          showNfts(nfts)
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

      setName(nfts[curNft].name);
      if (nfts[curNft].isAnimated) {
        pauseTime = 5000
        setImage(nfts[curNft].metadata.animation_url)
      } else {
        setImage(nfts[curNft].metadata.image)
      }

      curNft++
      setTimeout( () => {
        showNfts(nfts)
      }, pauseTime);

    }
  }, []);

  return (
    <div>
      {/* <a> */}
        <img className="nft-image" src={image}></img>
      {/* </a> */}
      <p className="image-title">{!name ? "Loading..." : name}</p>
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
    if(!nft.isAnimated) {
      if (nft.metadata.image.startsWith('ipfs')) {
        let key = nft.metadata.image.split('//')[1]
        nft.metadata.image = `https://ipfs.io/ipfs/${key}`
      }
    } else {
      console.log(gifsArr)
      if (gifs.some( (info) => info.id == nft.id)) {
        let el = gifs.find( ((info) => info.id == nft.id))
        console.log(el)
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
