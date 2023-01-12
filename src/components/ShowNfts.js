import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

function ShowNfts(props) {
  const orderNfts = true;
  const nfts = filterNfts(props.nfts, orderNfts);
  let pauseTime = 3000;

  const router = useRouter();
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);

  const curCaption = useRef();

  useEffect(() => {
    console.log("in effect");

    try {
      let index = window.localStorage.getItem("curNftIndex");
      if (index == nfts.length) {
        window.localStorage.setItem("curNftIndex", 0);
        index = 0;
      }
      pauseTime = checkPauseTime(nfts[index]);

      showNfts(nfts, index);

      setInterval(() => {
        let index = window.localStorage.getItem("curNftIndex");

        const updatedIndex = parseInt(index) + 1;
        if (updatedIndex == nfts.length) {
          window.localStorage.setItem("curNftIndex", 0);
        } else {
          window.localStorage.setItem("curNftIndex", updatedIndex);
        }

        index = window.localStorage.getItem("curNftIndex");

        pauseTime = checkPauseTime(nfts[index]);

        showNfts(nfts, index);
      }, pauseTime);
    } catch (error) {
      console.error(error);
    }
    return () => {
      router.beforePopState(null);
    };
  }, [router]);

  function checkPauseTime(nft) {
    if (nft.isAnimated) {
      return 5000;
    } else {
      return 3000;
    }
  }

  function showNfts(nfts, index) {
    let _index = index;

    setName(nfts[_index].title);
    curCaption.current = name;

    if (nfts[_index].isAnimated) {
      setImage(nfts[_index].animationUrl);
    } else {
      setImage(nfts[_index].imageUrl);
    }
  }

  return (
    <div className="image-container">
      <img
        alt="nft"
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
