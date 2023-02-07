import React, { useRef, useState } from "react";
import Image from "next/image";
import _ from "lodash";

function ShowNfts({ nfts, defaultNft }) {
  const [image, setImage] = useState(defaultNft);
  const isAnimated = useRef(false);
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
      setImage(nfts[index].animationUrl);
      isAnimated.current = true;
    } else {
      timeLeft.current = 3000;
      setImage(nfts[index].imageUrl);
      isAnimated.current = false;
    }
  };

  const handleNewNft = () => {
    startTime.current = Date.now();
    id.current = window.setTimeout(() => {
      count.current += 1;
      if (count.current == nfts.length) count.current = 0;
      showNfts(nfts, count.current);
    }, timeLeft.current);
  };

  return (
    <div className="mx-auto mt-0 mb-auto row-start-1 row-end-3 col-start-4 col-end-5">
      <Image
        height={320}
        width={320}
        alt="nft"
        className="hidden lg:grid w-80 h-80 max-h-max rounded-md"
        src={image}
        loader={isAnimated.current == true ? () => image : null}
        onMouseOver={(e) => {
          let image = e.currentTarget;
          let parent = image.parentElement;
          let children = parent.children;
          for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.classList.contains("opacity-0")) {
              child.classList.replace("opacity-0", "opacity-100");
            }
          }
        }}
        onMouseLeave={(e) => {
          let image = e.currentTarget;
          let parent = image.parentElement;
          let children = parent.children;
          for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child.classList.contains("opacity-100")) {
              child.classList.replace("opacity-100", "opacity-0");
            }
          }
        }}
        onLoad={() => {
          handleNewNft();
        }}
      ></Image>
      <p className="text-center cursor-default my-0 mx-auto opacity-0 pt-2 transition-all duration-300 ease-in-out">
        {!curCaption.current ? "" : curCaption.current}
      </p>
    </div>
  );
}

export default React.memo(ShowNfts, (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps) || prevProps.nfts.length == 0;
});
