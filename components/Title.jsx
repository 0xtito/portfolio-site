function Title({ phrase }) {
  const toggleTitleHover = (e) => {
    let header = e.currentTarget;
    const eth = header.parentElement.children.item(1);
    eth.classList.toggle("opacity-0");
    eth.classList.toggle("text-blue-island");
  };

  return (
    <div className="mt-0 mr-auto mb-auto ml-0 cursor-default col-start-2 col-end-3">
      <div className="text-5xl text-off-white m-auto">
        <a
          className="inline-block cursor-pointer hover:text-blue-island transition-all duration-300 ease-linear"
          onMouseOver={(e) => toggleTitleHover(e)}
          onMouseLeave={(e) => toggleTitleHover(e)}
          onClick={() =>
            window.open(
              "https://app.ens.domains/name/0xtito.eth/details",
              "_blank"
            )
          }
        >
          0xtito
        </a>
        <span className="inline-block cursor-default opacity-0 transition-all duration-300 ease-in-out">
          .eth
        </span>
      </div>
      <div className="phrase text-xs italic text-light-gray">{phrase}</div>
    </div>
  );
}

export default Title;
