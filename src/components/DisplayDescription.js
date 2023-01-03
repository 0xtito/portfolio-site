import React, { useState, useEffect, Fragment } from "react";

function DisplayDescription(props) {
  const { descriptions, isVisible } = props;

  const [selectedHeader, setSelectedHeader] = useState("");
  const [selectedDescription, setDescription] = useState("");
  const [displayBackButton, setDisplayBackButton] = useState(false);

  // useEffect(() => {}, []);

  if (isVisible) {
    return (
      <Fragment>
        <p
          className="return"
          onClick={(e) => {
            useEffect(() => {
              setDisplayBackButton(false);
              selectedDescription("");
              setSelectedHeader("");
            }, []);
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
        <div className="description-container">
          <p className="description">{descriptions[0].description}</p> 
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
