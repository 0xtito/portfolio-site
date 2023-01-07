import Link from "next/link";
import { useRouter } from "next/router";

function ChooseFromList(props) {
  const descriptions = JSON.parse(props.descriptions);
  const router = useRouter();
  const id = router.query;

  return (
    <div id="list-container" className="list-container">
      <ol id="list" className="list">
        {Object.values(descriptions).map((key) => (
          <li key={key.title} id={key.title}>
            <Link
              href={`/${key.title}`}
              className={`list-item ${
                id.descriptionTitle == key.title ? "clicked" : "not-clicked"
              }`}
              id={key.title}
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
              {key.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ChooseFromList;
