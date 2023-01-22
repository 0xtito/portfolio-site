import { useRouter } from "next/router";
import { Fragment } from "react";

function DisplayDescription(props) {
  const { selectedTitle, descriptions } = props;
  const router = useRouter();

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
        <p className="description">{selectedDescription.description}</p>
      </div>
    </Fragment>
  );
}

export default DisplayDescription;
