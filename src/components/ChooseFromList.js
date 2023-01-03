import React, { useState, useEffect } from "react";
import Link from "next/link"


const url = process.env.SERVER_URL;

function ChooseFromList(props) {
  const descriptions  = JSON.parse(props.descriptions);
  // console.log(Object)
  // console.log(descriptions);
  // Declare a state variable called "selected" with an initial value of "past"
  const [selected, setSelected] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [textMap, setTextMap] = useState(Object.values(descriptions));
  // setTextMap(props.descriptions);

  // console.log(props)


  useEffect(() => {
    // fetch(`${url}/text/description-text`, {
    //   method: "GET",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setTextMap(data);
    //   });

    // setTextMap(Object.keys(props.descriptions).map( ()));
    // console.log(textMap);
  }, []);

  let curTarget;
  let elementIsClicked = false;

  return (
      <div className="list-container">
        <ol className="list list-container">
          {/* {console.log(Object.values(descriptions))} */}
          {/* Render a list item for each key in the textMap object */}
          {Object.values(descriptions).map((key) => (
            <li key={key.title}>
              <a
                className="not-clicked list-item"
                onClick={(e) => {
                  // console.log(e.currentTarget.parentElement);
                  let children =
                    e.currentTarget.parentNode.parentNode.childNodes;
                  setSelected(key.title);
                  const listCount =
                    e.currentTarget.parentElement.parentElement
                      .childElementCount;
                  for (let i = 0; i < listCount; i++) {
                    if (children[i].className == "return") continue;
                    let item = children[i].childNodes.item(0);
                    const curElement = textMap.filter( (item) => item.title == e.currentTarget.innerHTML)
                    const index = textMap.findIndex( (item) => item.title == e.currentTarget.innerHTML);
                    if (e.currentTarget.innerHTML == item.innerHTML) {
                      textMap[index].isClicked = true;
                      elementIsClicked = true;
                      setIsSelected(true);
                      e.currentTarget.classList.replace(
                        "not-clicked",
                        "clicked"
                      );
                    } else {
                      item.classList.replace("clicked", "not-clicked");
                      // item.className = "not-clicked";
                      textMap[index].isClicked = false;
                    }
                  }
                  curTarget = e.currentTarget.innerHTML;
                }}
              >
                {key.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    );
}

export default ChooseFromList;
