import React, { useState } from "react";

function ChooseFromList() {
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
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis bibendum ut tristique et egestas quis ipsum suspendisse. Mattis enim ut tellus elementum sagittis vitae et. Posuere ac ut consequat semper viverra nam. Purus faucibus ornare suspendisse sed nisi lacus sed viverra. Posuere ac ut consequat semper viverra nam libero justo laoreet. Praesent tristique magna sit amet purus. \nSed odio morbi quis commodo odio aenean sed. Orci sagittis eu volutpat odio facilisis mauris sit amet. Odio ut sem nulla pharetra diam sit. Pharetra magna ac placerat vestibulum lectus mauris ultrices. \n\n\nFaucibus vitae aliquet nec ullamcorper sit amet risus nullam. Eget mi proin sed libero. Tincidunt nunc pulvinar sapien et ligula. Est placerat in egestas erat imperdiet sed. Arcu non sodales neque sodales ut.",
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
              console.log(parents[i].className);
              let list = parents[i].children;
              let items = list.item(0).children.item(0).children;
              console.log(items);
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
