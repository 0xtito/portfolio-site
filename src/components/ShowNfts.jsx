import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import _ from "lodash";
import axios from "axios";

const defaultImageSrc =
  "https://ipfs.io/ipfs/QmYHkHqChRBrBrCAfz3MLs2fh3i5jbprSaRRegahUkkY19";

function ShowNfts({ nfts }) {
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(defaultImageSrc);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const count = useRef(0);
  const id = useRef();
  const curCaption = useRef("lonely nights");
  const startTime = useRef(0);
  const timeLeft = useRef(3000);

  const showNfts = (nfts, index) => {
    const nft = nfts[index];
    curCaption.current = nft.title;

    if (nft.isAnimated) {
      timeLeft.current = 4500;
      console.log("animated");
      setImage(nfts[index].animationUrl);
    } else {
      timeLeft.current = 3000;
      console.log("not animated");
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
    // if (!nfts) return null;

    if (isFirstRender) {
      count.current = 0;
      console.log("inside first render");
      // showNfts(nfts, count.current);
      handleNewNft();
      setIsFirstRender(false);
    } else {
      handleNewNft();
    }
  }, []);

  // if (!nfts) return null;

  return (
    <div className="image-container">
      <Image
        height={350}
        width={350}
        // loader={() => image}
        unoptimized
        priority={image == defaultImageSrc}
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
        onLoad={() => {
          handleNewNft();
          // isLoading ? setIsLoading(false) : null;
        }}
      ></Image>
      <p className="image-title hide-caption">
        {!curCaption.current ? "" : curCaption.current}
      </p>
    </div>
  );
}

export default React.memo(ShowNfts, (prevProps, nextProps) => {
  console.log(prevProps, nextProps, _.isEqual(prevProps, nextProps));
  return _.isEqual(prevProps, nextProps);
});
