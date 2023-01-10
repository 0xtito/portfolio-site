import { useEffect, useRef, useState } from "react";
import localforage from "localforage";

function ShowNfts(props) {
  // const localDB = props.localForage;
  const orderNfts = true;
  const nfts = filterNfts(props.nfts, orderNfts);

  // let index;
  // if (typeof window === "undefined") {
  //   console.log("hi");
  //   index = localForage.getItem("portfolio-site/curNftIndex");
  // }
  // const index = localforage
  //   .getItem("portfolio-info/curNftIndex")
  //   .then((index) => index);
  // const [currentNft, setCurrentNft] = useLocalStorage("nftIndex", 0);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);

  const curCaption = useRef();
  const curImageIndex = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        // console.log(window.localStorage.getItem("portfolio-site/curNftIndex"));
        let index = window.localStorage.getItem("curNftIndex");
        if (index == nfts.length) {
          index = window.localStorage.setItem("curNftIndex", 0);
        }
        showNfts(nfts, index);
        // setImage(nfts[index].imageUrl);
        // setName(nfts[index].title);
        // curCaption.current = name;
        // setTimeout(() => {
        //   window.localStorage.setItem("curNftIndex", index++);
        //   let updatedIndex = parseInt(
        //     window.localStorage.getItem("curNftIndex")
        //   );
        //   showNfts(nfts, updatedIndex);
        // }, 3000);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

    function showNfts(nfts, index) {
      let _index = index;
      let pauseTime = 3000;

      if (index == nfts.length) {
        window.localStorage.setItem("curNftIndex", 0);
        _index = window.localStorage.getItem("curNftIndex");
      }

      setName(nfts[_index].title);
      curCaption.current = name;
      if (nfts[_index].isAnimated) {
        pauseTime = 5000;
        setImage(nfts[_index].animationUrl);
      } else {
        setImage(nfts[_index].imageUrl);
      }
      setTimeout(() => {
        let updatedIndex = parseInt(window.localStorage.getItem("curNftIndex"));
        window.localStorage.setItem("curNftIndex", updatedIndex + 1);
        showNfts(nfts, updatedIndex + 1);
      }, pauseTime);
    }
  }, []);

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

function useLocalStorage(key, initValue) {
  const [storedIndex, setStoredIndex] = useState(() => {
    if (typeof window === "undefined") {
      console.log("in server-side");
      return initValue;
    }

    try {
      // console.log(window.localStorage);
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(key) : initValue;
    } catch (error) {
      console.log(error);
      return initValue;
    }
  });

  const setIndexValue = (value) => {
    try {
      const indexToStore =
        value instanceof Function ? value(indexToStore) : value;
      setStoredIndex(value);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(indexToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedIndex, setIndexValue];
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
