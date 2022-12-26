import ChooseHeader from "./components/ChooseHeader.js";
import ShowNfts from "./components/ShowNfts.js";
// import NftScroller from "./components/NftScroller.js";
import React from "react";

// function App() {
//   return (
//     <div >
//       <h1>0xtito</h1>
//       <div>
//         <ChooseHeader />
//       </div>
//       <div className="image-container">
//         <ShowNfts />
//       </div>
//     </div>
//   );
// }

function App() {
  return (
    <div>
      <div className="content-container content-grid">
        <div grid-column="1"></div>
        <div className="intro_content content_width">
          I grew up in South Florida playing sports and always being with
          friends. I went to Saint Andrew’s High School for academics and
          lacrosse. After an amazing 4 years, I went to Lehigh University to
          study Mechanical Engineering, however, two years in, I realized and
          accepted that I had no idea what I wanted to do with my life, but
          becoming a mechanical engineer and growing deeper in debt was the only
          thing I was certain I was not going to do. After leaving, I spent the
          next few years soul searching between jobs and hobbies, and ultimately
          ended up entangled in the world of crypto and software engineering.
          Now I spend my days coding, teaching children how to code, and
          learning all I can about whatever interests me.
        </div>
        <div className="list">
          <ChooseHeader />
        </div>
      </div>
      <div id="content-container image-container">
        <div className=""></div>
        <ShowNfts />
      </div>
    </div>
  );
}

export default App;
