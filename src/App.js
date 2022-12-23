import ChooseHeader from "./components/ChooseHeader.js";
import ShowNfts from "./components/ShowNfts.js";
// import NftScroller from "./components/NftScroller.js";
import React from "react";

function App() {
  return (
    <div >
      <h1>0xtito</h1>
      <div>
        <ChooseHeader />
      </div>
      <div className="image-container">
        <ShowNfts />
      </div>
    </div>
  );
}

export default App;
