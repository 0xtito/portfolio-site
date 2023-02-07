import Link from "next/link";
import { useRouter } from "next/router";

function ChooseFromList({ titles }) {
  const router = useRouter();
  const id = router.query;

  return (
    <div className="m-auto md:mt-0 md:ml-0 text-sm md:text-md row-start-2 row-end-3 col-start-3 col-end-3">
      <ol>
        {titles.map((title) => (
          <li key={title} id={title} className="m-auto pt-0.5 list-none ">
            <Link
              shallow={true}
              href={`/${title}`}
              className={` hover:text-blue-island cursor-pointer transition-all duration-200 ease-linear  ${
                id.descriptionTitle == title
                  ? "text-blue-island"
                  : "text-off-white"
              }`}
              id={title}
              onClick={(e) => {
                let list = e.currentTarget.parentElement.parentElement.children;
                for (let i = 0; i < list.length; i++) {
                  let a = list[i].children.item(0);
                  if (a.innerHTML == e.currentTarget.innerHTML) {
                    if (!a.classList.contains("text-blue-island")) {
                      a.classList.replace("text-off-white", "text-blue-island");
                      list[i].id = "text-blue-island";
                    }
                  } else {
                    list[i].id = "";
                    a.classList.contains("text-blue-island")
                      ? a.classList.replace(
                          "text-blue-island",
                          "text-off-white"
                        )
                      : a.classList.add("text-off-white");
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
