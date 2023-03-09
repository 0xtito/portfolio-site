import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

function DisplayDescription() {
  const router = useRouter();
  const currentTitle = router.query.descriptionTitle;
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <Fragment>
      <div className="cursor-default row-start-3 row-end-4 col-start-1 col-end-2 mt-1">
        <a
          className="text-start text-base mt-0 md:pt-0 cursor-pointer hover:text-blue-island"
          onClick={() => {
            router.replace("/", undefined, {
              shallow: false,
            });
          }}
        >
          back
        </a>
      </div>
      <div className="col-start-2 col-end-5 row-start-4 row-end-5 md:row-start-3 md:row-end-4 md:col-start-2 md:col-end-4">
        <div className="p-0 text-xs md:text-sm w-100 cursor-default flex flex-col">
          {currentTitle == "past" && (
            <Fragment>
              <div className="text-base mb-5 lg:pr-36">
                <h3 className="italic text-xl mb-1">education</h3>
                <p className="list-item text-left list-inside ml-6 ">
                  graduate from{" "}
                  <a
                    onClick={() =>
                      window.open("https://www.saintandrews.net/#/", "_blank")
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Saint Andrew's School
                  </a>
                  . GPA ≈ 3.6 with Honors and AP coursework.
                </p>
                <p className="list-item text-left list-inside ml-6">
                  pursed a B.S. in Mechanical Engineering ('17 - '19) at
                  <a
                    onClick={() =>
                      window.open("https://www1.lehigh.edu/home", "_blank")
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    {" "}
                    Lehigh University
                  </a>
                  . GPA ≈ 3.0. <br />
                </p>
                <p className="list-item text-left list-inside ml-6">
                  graduate of the
                  <a
                    onClick={() =>
                      window.open(
                        "https://www.chainshot.com/bootcamp",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    {" "}
                    Chainshot{" "}
                  </a>
                  Ethereum Bootcamp. Learned smart contract development using
                  Solidity and JavaScript <br />
                </p>
                <p className="list-item text-left list-inside ml-6">
                  refined JavaScript knowledge and learned modern and classic
                  React, React Router, React Query, and Redux through
                  <a
                    onClick={() => window.open("https://ui.dev/", "_blank")}
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    {" "}
                    ui.dev{" "}
                  </a>
                </p>
              </div>
              <div className="text-base mb-5 lg:pr-36">
                <h3 className="italic text-xl mb-1">projects</h3>
                <p className="list-item text-left  list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://github.com/0xtito/portfolio-site",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    this website!{" "}
                  </a>
                  The tech stack used to build this site is JS, Tailwind CSS,
                  React, NextJS, and Vercel
                </p>
                <p className="list-item text-left list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://github.com/0xtito/UrNFTrader",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    urNFTrader
                  </a>
                  . A collection of smart contract that allows users to set
                  limit buy orders for any NFT collection on Opensea. This was
                  my final project for the Chainshot Ethereum Bootcamp.
                </p>
                <p className="list-item text-left list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://github-battle-0xtito.vercel.app/",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    github battle
                  </a>
                  . A website that tracks the most popular repos from several
                  coding languages. Also allows you to "battle" other Github
                  users based on followers, repos, and a few other metrics. This
                  was done as a project in ui.dev.
                </p>
              </div>
              <div className="text-base mb-5 lg:pr-36">
                <h3 className="italic text-xl mb-1">accolades</h3>
                <p className="list-item text-left list-inside ml-6">
                  captain of the Lacrosse and Football team at Saint Andrew's
                  School
                </p>
                <p className="list-item text-left list-inside ml-6">
                  recipient of the "Saint Andrew's Athletic Plaque", which
                  states, "This award, the highest given to a senior boy and
                  girl, is presented to the student athletes who, while
                  displaying admirable attitudes and sportsmanlike conduct,
                  consistently made outstanding contributions to the varsity
                  athletic program of Saint Andrew's School."
                </p>
              </div>
            </Fragment>
          )}
          {currentTitle == "current" && (
            <Fragment>
              <div className="text-base mb-5 lg:pr-36">
                <h3 className="italic text-xl mb-1">work</h3>
                <p className="list-item text-left list-inside ml-6 ">
                  coding teacher at{" "}
                  <a
                    onClick={() =>
                      window.open("https://penguincodingschool.com/", "_blank")
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Penguin Coding School
                  </a>
                  . I teach students, ages ranging from 7 to 13, the
                  fundamentals of programming and how to write programs in
                  JavaScript, Python, Lua (Roblox).
                </p>
              </div>
              <div className="text-base mb-5 lg:pr-36">
                <h3 className="italic text-xl mb-1">pursuits</h3>
                <p className="list-item text-left list-inside ml-6 ">
                  front-end web development. Specifically, using a modern tech
                  stack that allows me to build and manage a back-end use
                  server-less and/or edge functions.
                </p>
                <p className="list-item text-left list-inside ml-6 ">
                  smart contract development. Write smart contracts using
                  Solidity to help create a more transparent, decentralized
                  internet. The Ethereum blockchain is a type of backend in and
                  of itself, so by utilizing my front-end development knowledge
                  in combination with writing smart contracts that write and
                  read from the blockchain, I strive to curate very user
                  friendly applications (which is a big weak point in this
                  industry as of today)
                </p>
              </div>
              <div className="text-base mb-5 lg:pr-36">
                <h3 className="italic text-xl mb-1">projects</h3>
                <p className="list-item text-left list-inside ml-6">
                  building a proper front-end for{" "}
                  <a
                    onClick={() =>
                      window.open(
                        "https://github.com/0xtito/UrNFTrader",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    UrNFTrader
                  </a>{" "}
                  . Add/optimize the smart contracts to be able to set limit
                  sell orders. Other ideas to improve upon UrNFTrader are:
                  remove the need for me to control the user's assets at any
                  point, create presistant data storage, and possibly, implement
                  account abstraction.
                </p>
              </div>
            </Fragment>
          )}
          {currentTitle == "interests" && (
            <Fragment>
              <div className="text-base mb-5 lg:pr-36">
                <h3 className="italic text-xl mb-1">tech</h3>
                <p className="list-item text-left list-inside ml-6 ">
                  <a
                    onClick={() =>
                      window.open("https://ethereum.org/en/defi/", "_blank")
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    decentralized finance (DeFi)
                  </a>
                </p>
                <p className="list-item text-left list-inside ml-6 ">
                  the eventual merge of the blockchain and IoT/Real World Assets
                </p>
                <p className="list-item text-left list-inside ml-6 ">
                  <a
                    onClick={() =>
                      window.open(
                        "https://ethereum.org/en/roadmap/account-abstraction/",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Account Abstraction
                  </a>
                </p>
                <p className="list-item text-left list-inside ml-6 ">
                  the inevitable merge of the blockchain and IoT/Real World
                  Assets
                </p>
                <p className="list-item text-left list-inside ml-6 ">
                  <a
                    onClick={() =>
                      window.open(
                        "https://www.ibm.com/topics/natural-language-processing",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Natural Language Processing
                  </a>{" "}
                  (only have a conceptual grasp of it)
                </p>
              </div>
              <div className="text-base mb-5 lg:pr-36">
                <h3 className="italic text-xl mb-1">athletics</h3>
                <p className="list-item text-left list-inside ml-6 ">
                  brazilian jiujitsu
                </p>
                <p className="list-item text-left list-inside ml-6 ">mma</p>
              </div>
            </Fragment>
          )}
          {currentTitle == "misc" && (
            <Fragment>
              <div className="text-base mb-5 lg:pr-36">
                <a
                  onClick={() =>
                    window.open(
                      "https://wordsforthought.substack.com/p/thefool",
                      "_blank"
                    )
                  }
                  className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out text-xl italic"
                >
                  A Fool's Journey
                </a>
                <p className="list-item list-inside ml-6 ">
                  march, 2021. a piece I wrote that began as a journal entry,
                  but evolved into an explorative and personal piece on the
                  insignificance of choosing the "best" career path
                </p>
              </div>
              <div className="text-base mb-5 lg:pr-36">
                <h3 className=" text-xl mb-1 italic">books/essays i love</h3>
                <div className=" list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open("https://a.co/d/i2qhiJD", "_blank")
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Zorba The Greek
                  </a>
                </div>
                <div className="list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open("https://a.co/d/eqH6eY9", "_blank")
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out "
                  >
                    Meditations
                  </a>
                </div>
                <div className="list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open("https://a.co/d/3rRkqsq", "_blank")
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    everyone's a aliebn when ur a aliebn too
                  </a>
                </div>
                <div className="text-left list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://www.britannica.com/topic/The-Myth-of-Sisyphus",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    The Myth of Sisyphus
                  </a>
                </div>
                <div className="text-left list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open("https://a.co/d/0Ijlz17", "_blank")
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Crime and Punishment
                  </a>
                </div>
                <div className="text-left list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://www.slatestarcodexabridged.com/Meditations-On-Moloch",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Meditations on Molch
                  </a>
                </div>
              </div>
              <div className="text-base mb-5 lg:pr-36">
                <h3 className=" text-xl mb-1 italic">songs i love</h3>
                <div className=" list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://music.youtube.com/watch?v=zzHouyi6t4g&feature=share",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Cyclone
                  </a>
                </div>
                <div className="list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://music.youtube.com/watch?v=g08gsd7d87Y",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out "
                  >
                    Day One (A Song about Nothing)
                  </a>
                </div>
                <div className="list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://music.youtube.com/watch?v=-bATjVI0gNM",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Keep the Wolves Away
                  </a>
                </div>
                <div className="text-left list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://music.youtube.com/watch?v=E_CVcXtCjnU",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Day N' Nite
                  </a>
                </div>
                <div className="text-left list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://music.youtube.com/watch?v=FQr3-k9Ea1Y",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Divinity
                  </a>
                </div>
              </div>
              <div className="text-base mb-5 lg:pr-36">
                <h3 className=" text-xl mb-1 italic">games i love</h3>
                <div className=" list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open("https://undertale.com/", "_blank")
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Undertale
                  </a>
                </div>
                <div className="list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open("https://playvalorant.com/en-us/", "_blank")
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out "
                  >
                    Valorant
                  </a>
                </div>
                <div className="list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://store.steampowered.com/app/1272160/The_Life_and_Suffering_of_Sir_Brante/",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    The Life and Suffering of Sir Brante
                  </a>
                </div>
                <div className="text-left list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://store.steampowered.com/app/1222140/Detroit_Become_Human/",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Detroit: Become Human
                  </a>
                </div>
                <div className="text-left list-inside ml-6">
                  <a
                    onClick={() =>
                      window.open(
                        "https://store.steampowered.com/app/960910/Heavy_Rain/",
                        "_blank"
                      )
                    }
                    className="hover:text-blue-island cursor-pointer transition-all duration-200 ease-in-out"
                  >
                    Heavy Rain
                  </a>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default DisplayDescription;
