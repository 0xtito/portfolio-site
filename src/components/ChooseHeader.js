import React, { useState } from "react";

function ChooseHeader() {
  // Declare a state variable called "selected" with an initial value of "past"
  const [selected, setSelected] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  // Define an object that maps list item values to their corresponding text
  const textMap = {
    past: {
      text: 'This is the text for the "past" list item. This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.',
      isClicked: false,
    },
    current: {
      text: 'This is the text for the "current" list item.',
      isClicked: false,
    },
    future: {
      text: 'This is the text for the "future" list item.',
      isClicked: false,
    },
    interests: {
      text: 'This is the text for the "interests" list item.',
      isClicked: false,
    },
  };

  let curTarget;
  let elementIsClicked = false;

  return (
    <div>
      <ol className="list list-container">
        {/* Render a list item for each key in the textMap object */}
        {Object.keys(textMap).map((key) => (
          <li
            className="not-clicked"
            key={key}
            onClick={(e) => {
              let child = e.currentTarget.parentNode.childNodes;
              setSelected(key);
              const listCount = e.currentTarget.parentElement.childElementCount;
              for (let i = 0; i < listCount; i++) {
                if (child[i].className == "return") continue;
                if (e.currentTarget.innerHTML == child[i].innerHTML) {
                  textMap[e.currentTarget.innerHTML].isClicked = true;
                  elementIsClicked = true;
                  setIsSelected(true);
                  e.currentTarget.classList.replace("not-clicked", "clicked");
                } else {
                  child[i].className = "not-clicked";
                  textMap[child[i].innerHTML].isClicked = false;
                }
              }
              console.log(e.currentTarget);
              // if (e.currentTarget.classList.value == "not-clicked") {
              //   textMap[e.currentTarget.innerHTML].isClicked = true;
              //   e.currentTarget.classList.replace("not-clicked", "clicked");
              // }
              curTarget = e.currentTarget.innerHTML;
            }}
          >
            {key}
          </li>
        ))}
      </ol>
      <div>
        <p
          className="return"
          onClick={(e) => {
            let parents =
              e.currentTarget.parentElement.parentElement.childNodes;
            let ol = parents.item(0);
            if (ol.nodeName != "OL") return;
            ol.childNodes.forEach((child) => {
              if (child.className == "return") return;
              if (child.className == "clicked") {
                console.log("is click");
                child.className = "not-clicked";
                textMap[child.innerHTML].isClicked = false;
                setSelected(null);
                setIsSelected(false);
              }
            });
          }}
        >
          {isSelected ? "back" : null}
        </p>
        {/* Display the corresponding text for the selected list item */}
        <p className="description">
          {textMap[selected] ? textMap[selected].text : null}
        </p>
      </div>
    </div>
  );
}

export default ChooseHeader;
