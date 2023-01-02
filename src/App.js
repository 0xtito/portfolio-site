import ChooseFromList from "./components/ChooseFromList.js";
import ShowNfts from "./components/ShowNfts.js";
import Title from "./components/Title.js";
import React, { useEffect, useState } from "react";

const url = process.env.SERVER_URL;
let eth = ".eth";

function App() {
  const { jsx: listJsx, backJsx, description } = ChooseFromList();
  const { jsx: nftsJsx, pudgy } = ShowNfts();
  const [phrase, setPhrase] = useState(null);
  const [intro, setIntro] = useState(null);
  const [pudgyImg, setPudgyImg] = useState(null);

  useEffect(() => {
    fetch(`${url}/text/intro`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setIntro(data));

    fetch(`${url}/phrase`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((phrase) => setPhrase(phrase));

    fetch(`${url}/nfts/pudgy`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((pudgy) => {
        console.log(pudgy);
        let img = pudgy.rawMetadata.image;
        setPudgyImg(img);
      });
  }, []);

  return (
    <div>
      <div className="content-container content-grid">
        {/* <div grid-column="1"></div> */}
        <img className="pudgy" src={pudgyImg}></img>
        <div className="intro_content content_width">{intro}</div>
        <div className="image-container">{nftsJsx}</div>
        <Title phrase={phrase} />
        <div className="list-container">{listJsx}</div>
        <div className="return-container">{backJsx}</div>
        <div className="description-container">
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
