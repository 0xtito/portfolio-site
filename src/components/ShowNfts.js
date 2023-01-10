import { useEffect, useRef, useState } from "react";

function ShowNfts(props) {
  const orderNfts = true;
  const nfts = filterNfts(props.nfts, orderNfts);
  const [name, setName] = useState(nfts[0].title);
  const [image, setImage] = useState(nfts[0].imageUrl);
  const curCaption = useRef();
  const curImageIndex = useRef();

  useEffect(() => {
    let curNft = 0;
    async function fetchData() {
      try {
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
        alt={setName}
        className="nft-image"
        src={image}
        loading="eager"
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
