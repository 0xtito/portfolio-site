import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

function DisplayDescription({
  selectedTitle,
  descriptions,
  selectedDescription: hey,
}) {
  const router = useRouter();
  const [currentDescription, setCurrentDescription] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    setCurrentDescription(
      descriptions.filter((des) => des.title == selectedTitle)[0]
    );
  }, [selectedTitle]);

  const selectedDescription = descriptions.filter(
    (des) => des.title == selectedTitle
  )[0];

  return (
    <Fragment>
      <div className="back-container">
        <p
          className="back"
          onClick={() => {
            router.replace("/", undefined, {
              shallow: true,
            });
          }}
        >
          back
        </p>
      </div>
      <div className="description-container">
        <p className="description">{currentDescription.description}</p>
      </div>
    </Fragment>
  );
}

export default DisplayDescription;
