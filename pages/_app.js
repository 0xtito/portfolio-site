import "../src/index.css";

function PortfolioSite({Component, pageProps}) {
  // console.log(Component)
  return (
    <div>
      <Component {...pageProps}/>
    </div> 
  )
}

export default PortfolioSite;