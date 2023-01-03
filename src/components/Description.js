import React, { useState, useEffect } from "react";

function Description(props) {
  const [selectedHeader, setSelectedHeader] = useState("");
  const [selectedDescription, setDescription] = useState("");
  const [displayBackButton, setDisplayBackButton] = useState(false);

  // useEffect(() => {}, []);

  return (
    <p
      className="return"
      onClick={(e) => {

        useEffect( () => {
          setDisplayBackButton(false);
          selectedDescription("")
          setSelectedHeader("")
        }, [])
        let parents = e.currentTarget.parentElement.parentElement.children;
        for (let i = 0; i < parents.length; i++) {
          if (parents[i].className == "list-container") {
            let list = parents[i].children;
            let items = list.item(0).children.item(0).children;
            for (let j = 0; j < items.length; j++) {
              let item = items[j].children.item(0);
              if (item.classList.contains("clicked")) {
                item.classList.replace("clicked", "not-clicked");
                textMap[item.innerHTML].isClicked = false;
                setSelected(null);
                setIsSelected(false);
              }
            }
          }
        }
      }}
    >
      {displayBackButton ? "back" : null}
    </p>
  );
}

export default Description;