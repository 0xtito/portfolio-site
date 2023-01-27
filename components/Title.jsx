import { useState } from "react";

function Title({ title: _title, phrase, titleWithHover }) {
  const [title, setTitle] = useState(_title);

  return (
    <div className="title-container">
      <div
        className="title"
        onMouseOver={(e) => {
          let _title = e.currentTarget;
          setTitle(titleWithHover);
          _title.classList.add("title-hover");
        }}
        onMouseLeave={(e) => {
          let header = e.currentTarget;
          setTitle(_title);
          header.classList.remove("title-hover");
        }}
        onClick={() =>
          window.open(
            "https://app.ens.domains/name/0xtito.eth/details",
            "_blank"
          )
        }
      >
        {title}
      </div>
      <div className="phrase">{phrase}</div>
    </div>
  );
}

export default Title;
