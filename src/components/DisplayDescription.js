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
            if (typeof window !== "undefined") {
              console.log("click back and in client");
              const fakeTimeout = setTimeout(";");
              for (let i = 0; i < fakeTimeout; i++) {
                clearTimeout(i);
              }
              let index = window.localStorage.getItem("curNftIndex");
            }
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
