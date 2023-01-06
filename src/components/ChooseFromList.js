import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import localforage from "localforage";

function ChooseFromList(props) {
  const descriptions = JSON.parse(props.descriptions);
  console.log(descriptions);
  const router = useRouter();
  const currentTitle = useRef();

  function showDescriptionHandler(title) {
    // setSelectedTitle(title);
    currentTitle.current = title;
    router.push(`/${currentTitle.current}`);
  }

  // Declare a state variable called "selected" with an initial value of "past"
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [textMap, setTextMap] = useState(Object.values(descriptions));
  // setTextMap(props.descriptions);

  // console.log(props)

  useLayoutEffect(() => {
    setDescription(isSelected, selectedTitle, descriptions);
  });

  // useEffect(() => {
  //   async function setDescription() {
  //     if (isSelected) {
  //       console.log('storing description')
  //       await localforage.setItem("selectedTotalDescription", descriptions.filter( (des) => {
  //         return des.title == selectedTitle;
  //       }))
  //     } else {
  //       // console.log('not selected')
  //       // await localforage.setItem("selectedTotalDescription", {title: "", description: ""})
  //     }
  //   }
  //   setDescription()
  //   // fetch(`${url}/text/description-text`, {
  //   //   method: "GET",
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     console.log(data);
  //   //     setTextMap(data);
  //   //   });
  //   // setTextMap(Object.keys(props.descriptions).map( ()));
  //   // console.log(textMap);
  // }, []);

  let curTarget;
  let elementIsClicked = false;

  return (
    <div id="list-container" className="list-container">
      <ol id="list" className="list">
        {/* {console.log(Object.values(descriptions))} */}
        {/* Render a list item for each key in the textMap object */}
        {Object.values(descriptions).map((key) => (
          <li key={key.title}>
            <Link href={`/${key.title}`} legacyBehavior>
              <a
                className="list-item not-clicked"
                id={key.title}
                onClick={(e) => {
                  setIsSelected(true);
                  setSelectedTitle(e.currentTarget.innerHTML);
                  let list =
                    e.currentTarget.parentElement.parentElement.children;
                  const listCount =
                    e.currentTarget.parentElement.parentElement
                      .childElementCount;

                  for (let i = 0; i < list.length; i++) {
                    let a = list[i].children.item(0);

                    if (a.innerHTML == e.currentTarget.innerHTML) {
                      if (!a.classList.contains("clicked")) {
                        a.classList.replace("not-clicked", "clicked");
                        list[i].id = "clicked";
                        localforage.setItem(
                          "selectedTitle",
                          e.currentTarget.innerHTML
                        );
                      }
                    } else {
                      list[i].id = "";
                      a.classList.contains("clicked")
                        ? a.classList.replace("clicked", "not-clicked")
                        : a.classList.add("not-clicked");
                    }
                  }
                  // showDescriptionHandler(e.currentTarget.innerHTML);
                  curTarget = e.currentTarget.innerHTML;
                }}
              >
                {key.title}
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

async function setDescription(isSelected, selectedTitle, descriptions) {
  if (isSelected) {
    console.log("storing description");
    const des = await localforage.setItem(
      "selectedTotalDescription",
      descriptions.filter((des) => {
        return des.title == selectedTitle;
      })
    );
    console.log(des);
  }
}

export default ChooseFromList;
