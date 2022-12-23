import React, { useState } from "react";

function ChooseHeader() {
  // Declare a state variable called "selected" with an initial value of "past"
  const [selected, setSelected] = useState(null  );

  // Define an object that maps list item values to their corresponding text
  const textMap = {
    past: 'This is the text for the "past" list item. This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.This is the text for the "past" list item.',
    current: 'This is the text for the "current" list item.',
    future: 'This is the text for the "future" list item.',
    interests: 'This is the text for the "interests" list item.',
  };

  return (
    <div>
      <ul className="list">
        {/* Render a list item for each key in the textMap object */}
        {Object.keys(textMap).map((key) => (
          <li
            className='not-clicked'
            key={key}
            onLoad={ () => console.log('inside li')}
            onClick={(e) => {
              setSelected(key);
              console.log(e.currentTarget.parentElement)
              const listCount = e.currentTarget.parentElement.childElementCount
              let child = e.currentTarget.parentNode.childNodes
              for (let i=0; i < listCount; i++) {
                child[i].className = 'not-clicked'
              }
              e.currentTarget.classList.replace('not-clicked', 'clicked')
            }}
          >
            {key}
          </li>
        ))}
      </ul>
      {/* Display the corresponding text for the selected list item */}
      <p className='description'>{textMap[selected]}</p>
    </div>
  );
}

export default ChooseHeader;
