import React, { useState, useEffect } from "react";

const url = process.env.SERVER_URL;

function ChooseFromList() {
  // Declare a state variable called "selected" with an initial value of "past"
  const [selected, setSelected] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [textMap, setTextMap] = useState({});

  useEffect(() => {
    fetch(`${url}/text/description-text`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTextMap(data);
      });
  }, []);

  let curTarget;
  let elementIsClicked = false;

  return {
    jsx: (
      <div>
        <ol className="list list-container">
          {/* Render a list item for each key in the textMap object */}
          {Object.keys(textMap).map((key) => (
            <li key={key}>
              <a
                className="not-clicked list-item"
                onClick={(e) => {
                  let children =
                    e.currentTarget.parentNode.parentNode.childNodes;
                  setSelected(key);
                  const listCount =
                    e.currentTarget.parentElement.parentElement
                      .childElementCount;
                  for (let i = 0; i < listCount; i++) {
                    if (children[i].className == "return") continue;
                    let item = children[i].childNodes.item(0);
                    if (e.currentTarget.innerHTML == item.innerHTML) {
                      textMap[e.currentTarget.innerHTML].isClicked = true;
                      elementIsClicked = true;
                      setIsSelected(true);
                      e.currentTarget.classList.replace(
                        "not-clicked",
                        "clicked"
                      );
                    } else {
                      item.classList.replace("clicked", "not-clicked");
                      // item.className = "not-clicked";
                      textMap[item.innerHTML].isClicked = false;
                    }
                  }
                  curTarget = e.currentTarget.innerHTML;
                }}
              >
                {key}
              </a>
            </li>
          ))}
        </ol>
      </div>
    ),
    backJsx: (
      <p
        className="return"
        onClick={(e) => {
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
        {isSelected ? "back" : null}
      </p>
    ),
    description: textMap[selected] ? textMap[selected].text : null,
  };
}

export default ChooseFromList;
