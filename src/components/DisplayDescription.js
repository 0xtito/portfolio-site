import { useRouter } from "next/router";
import { Fragment } from "react";

function DisplayDescription(props) {
  const { selectedDescription } = props;
  const router = useRouter();

  return (
    <Fragment>
      <div className="back-container">
        <p
          className="back"
          onClick={() => {
            router.replace("/");
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
