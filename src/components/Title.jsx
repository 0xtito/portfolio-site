import { useState } from "react";

function Title(props) {
  const [title, setTitle] = useState(props.title);

  return (
    <div className="title-container">
      <div
        className="title"
        onMouseOver={(e) => {
          let title = e.currentTarget;
          setTitle(props.titleWithHover);
          title.classList.add("title-hover");
        }}
        onMouseLeave={(e) => {
          let header = e.currentTarget;
          setTitle(props.title);
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
      <div className="phrase">{props.phrase}</div>
    </div>
  );
}

export default Title;
