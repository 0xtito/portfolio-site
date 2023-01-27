import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ChooseFromList({ descriptions: descriptionsProp }) {
  const [descriptions, setDescriptions] = useState([]);
  const router = useRouter();
  const id = router.query;

  useEffect(() => {
    setDescriptions(descriptionsProp);
  }, []);

  return (
    <div id="list-container" className="list-container">
      <ol id="list" className="list">
        {descriptions.map(({ title }) => (
          <li key={title} id={title}>
            <Link
              shallow={true}
              href={`/${title}`}
              className={`list-item ${
                id.descriptionTitle == title ? "clicked" : "not-clicked"
              }`}
              id={title}
              onClick={(e) => {
                let list = e.currentTarget.parentElement.parentElement.children;
                for (let i = 0; i < list.length; i++) {
                  let a = list[i].children.item(0);
                  if (a.innerHTML == e.currentTarget.innerHTML) {
                    if (!a.classList.contains("clicked")) {
                      a.classList.replace("not-clicked", "clicked");
                      list[i].id = "clicked";
                    }
                  } else {
                    list[i].id = "";
                    a.classList.contains("clicked")
                      ? a.classList.replace("clicked", "not-clicked")
                      : a.classList.add("not-clicked");
                  }
                }
              }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ChooseFromList;
