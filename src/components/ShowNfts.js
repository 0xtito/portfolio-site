import { useEffect, useRef, useState } from "react";

// const defaultImage = require("../../images/default_image.png").default;

function ShowNfts(props) {
  const orderNfts = true;

  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const curCaption = useRef();

  useEffect(() => {
    let curNft = 0;
    async function fetchData() {
      try {
        const nfts = filterNfts(props.nfts, orderNfts);
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
        setImage(nfts[curNft].animationUrl);
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
            }
          }
        }}
        onMouseLeave={(e) => {
          let image = e.currentTarget;
          let parent = image.parentElement;
          let children = parent.children;
          for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.classList.contains("show-caption")) {
              child.classList.replace("show-caption", "hide-caption");
            }
          }
        }}
      ></img>
      <p className="image-title hide-caption">{!name ? "" : name}</p>
    </div>
  );
}

function filterNfts(nftsArr, isOrdered) {
  // find pudgy and remove
  for (let i = 0; i < nftsArr.length; i++) {
    if (nftsArr[i].name == "Lil Pudgy #4495") {
      let index = nftsArr.indexOf(nftsArr[i]);
      nftsArr.splice(index, 1);
      break;
    }
  }

  // order NFTs
  if (isOrdered) {
    nftsArr.sort((a, b) => {
      let orderOfA = a.order;
      let orderOfB = b.order;

      return orderOfA - orderOfB;
    });
  }

  return nftsArr;
}

export default ShowNfts;
