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
      <div className="cursor-default row-start-3 row-end-4 col-start-1 col-end-2">
        <a
          className="text-start text-sm mt-0 pt-0 cursor-pointer hover:text-blue-island"
          onClick={() => {
            router.replace("/", undefined, {
              shallow: true,
            });
          }}
        >
          back
        </a>
      </div>
      <div className="col-start-2 col-end-4">
        <p className="p-0 pr-40 text-sm">{currentDescription.description}</p>
      </div>
    </Fragment>
  );
}

export default DisplayDescription;
