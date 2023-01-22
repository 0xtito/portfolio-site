import React, { Fragment, useMemo, memo } from "react";
import _ from "lodash";

import ChooseFromList from "./ChooseFromList";
import Title from "./Title";

function BasePage(props) {
  let { descriptions, intro, pudgyImg, selectedTitle } = props;

  return (
    <Fragment>
      <img className="pudgy" src={pudgyImg}></img>
      <div className="intro_content content_width">{intro}</div>
      <Title
        title="0xtito"
        titleWithHover="0xtito.eth"
        phrase="'Not Today'"
      ></Title>
      <ChooseFromList
        descriptions={JSON.stringify(descriptions)}
        selectedTitle={selectedTitle}
      ></ChooseFromList>
    </Fragment>
  );
}

export default BasePage;
