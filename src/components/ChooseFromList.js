import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const url = process.env.SERVER_URL;

function ChooseFromList(props) {
  const descriptions = JSON.parse(props.descriptions);
  console.log(descriptions)
  const router = useRouter();
  const currentTitle = useRef()

  function showDescriptionHandler(title) {
    console.log(`in handler`)
    // setSelectedTitle(title);
    currentTitle.current = title
    router.push(`/${currentTitle.current}`)
  }

  // Declare a state variable called "selected" with an initial value of "past"
  const [selectedTitle, setSelectedTitle] = useState(null);
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
    <div id="list-container" className="list-container">
      <ol id="list" className="list">
        {/* {console.log(Object.values(descriptions))} */}
        {/* Render a list item for each key in the textMap object */}
        {Object.values(descriptions).map((key) => (
          <li key={key.title}>
            <a
              className="list-item not-clicked"
              id={key.title}
              onClick={(e) => {
                // e.currentTarget.parentElement.id = 'clicked';
                // e.currentTarget.parentElement.classList.replace()
                let list =
                  e.currentTarget.parentElement.parentElement.children;
                  console.log(list)
                // setSelected(key.title);
                const listCount =
                  e.currentTarget.parentElement.parentElement.childElementCount;
                const curElement = textMap.filter(
                  (item) => item.title == e.currentTarget.innerHTML
                );
                const index = textMap.findIndex(
                  (item) => item.title == e.currentTarget.innerHTML
                );

                for (let i = 0; i < listCount; i++) {
                    let a = list[i].children.item(0);

                    if (a.innerHTML == e.currentTarget.innerHTML) {
                      if (!a.classList.contains('clicked')) {
                        a.classList.replace('not-clicked', 'clicked')
                        list[i].id = "clicked";
                      }
                    } else {
                      list[i].id = '';
                      a.classList.contains('clicked') ? a.classList.replace('clicked', 'not-clicked') : a.classList.add('not-clicked')
                    }
                }
                showDescriptionHandler(e.currentTarget.innerHTML)
                console.log(list);
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
