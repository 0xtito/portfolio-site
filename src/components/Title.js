import React, { useEffect, useState } from "react";

const url = process.env.SERVER_URL;

function Title(props) {
  const [title, setTitle] = useState("");
  let titleContent;

  useEffect(() => {
    fetch(`${url}/text/title-content`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((_titleContent) => {
        titleContent = _titleContent;
        console.log("inside Effect");
        setTitle(titleContent.name);
      });
  });

  return (
    <div className="title-container">
      <div
        className="title"
        onMouseOver={(e) => {
          let title = e.currentTarget;
          let eth = title.children[0];
          title.innerHTML = titleContent.nameWithEth;
          title.classList.add("title-hover");
        }}
        onMouseLeave={(e) => {
          let title = e.currentTarget;
          let eth = title.children[0];
          title.innerHTML = titleContent.name;
          title.classList.remove("title-hover");
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
