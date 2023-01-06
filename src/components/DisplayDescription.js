import { useRouter } from "next/router";
import React, { useState, useEffect, Fragment } from "react";

import MainPage from "../../pages";

function DisplayDescription(props) {
  const { selectedDescription, isVisible } = props;
  console.log(selectedDescription)
  const router = useRouter();
  console.log();

  const [selectedHeader, setSelectedHeader] = useState("");
  // const [selectedDescription, setDescription] = useState("");
  const [displayBackButton, setDisplayBackButton] = useState(isVisible);

  // useEffect(() => {}, []);

  if (displayBackButton) {
    return (
      <Fragment>
        <div className="back-container">
          <p
            className="back"
            onClick={(e) => {
              let listItems =
                e.currentTarget.parentElement.parentElement.children;
              // let parents = e.currentTarget.parentElement.children;
              for (let i = 0; i < listItems.length; i++) {
                // if (parents[i].className == "list-container") {
                //   let list = parents[i].children;
                //   console.log(list)
                //   let items = list.item(0).children.item(0).children;
                //   for (let j = 0; j < items.length; j++) {
                //     let item = items[j].children.item(0);
                //     if (item.classList.contains("clicked")) {
                //       item.classList.replace("clicked", "not-clicked");
                //       textMap[item.innerHTML].isClicked = false;
                //       setSelected(null);
                //       setIsSelected(false);
                //     }
                //   }
                // }
              }
            }}
          >
            {displayBackButton ? "back" : null}
          </p>
        </div>
        <div className="description-container">
          <p className="description">{selectedDescription.description}</p>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }

  // return (
  //   <p
  //     className="return"
  //     onClick={(e) => {

  //       useEffect( () => {
  //         setDisplayBackButton(false);
  //         selectedDescription("")
  //         setSelectedHeader("")
  //       }, [])
  //       let parents = e.currentTarget.parentElement.parentElement.children;
  //       for (let i = 0; i < parents.length; i++) {
  //         if (parents[i].className == "list-container") {
  //           let list = parents[i].children;
  //           let items = list.item(0).children.item(0).children;
  //           for (let j = 0; j < items.length; j++) {
  //             let item = items[j].children.item(0);
  //             if (item.classList.contains("clicked")) {
  //               item.classList.replace("clicked", "not-clicked");
  //               textMap[item.innerHTML].isClicked = false;
  //               setSelected(null);
  //               setIsSelected(false);
  //             }
  //           }
  //         }
  //       }
  //     }}
  //   >
  //     {displayBackButton ? "back" : null}
  //   </p>
  // );
}

export default DisplayDescription;
