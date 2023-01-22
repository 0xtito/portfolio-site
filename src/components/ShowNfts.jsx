import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import _, { filter } from "lodash";

function ShowNfts({ nfts }) {
  const [image, setImage] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const count = useRef(0);
  const id = useRef();
  const curCaption = useRef();
  const startTime = useRef(0);
  const timeLeft = useRef(3000);

  const showNfts = (nfts, index) => {
    const nft = nfts[index];
    curCaption.current = nft.title;

    if (nft.isAnimated) {
      timeLeft.current = 4500;
      setImage(nfts[index].animationUrl);
    } else {
      timeLeft.current = 3000;
      setImage(nfts[index].imageUrl);
    }
  };

  const handleNewNft = () => {
    console.log("handling");
    startTime.current = Date.now();
    id.current = window.setTimeout(() => {
      count.current += 1;
      if (count.current == nfts.length) count.current = 0;
      showNfts(nfts, count.current);
    }, timeLeft.current);
  };

  useEffect(() => {
    if (!nfts) return null;

    if (isFirstRender) {
      count.current = 0;
      console.log("inside first render");
      showNfts(nfts, count.current);
      setIsFirstRender(false);
    } else {
      handleNewNft();
    }
  }, []);

  if (!nfts) return null;

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
        onLoad={() => handleNewNft()}
      ></img>
      <p className="image-title hide-caption">
        {!curCaption.current ? "" : curCaption.current}
      </p>
    </div>
  );
}

export default React.memo(ShowNfts, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
});
