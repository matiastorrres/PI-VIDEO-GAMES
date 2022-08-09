import { Link } from "react-router-dom";
import LandingPageCss from "./LandingPage.module.css";

function LandingPage () {
    return(
        <div className={LandingPageCss.landingPage__container}>
          <h1 className={LandingPageCss.landingPage__titulo}>welcome to henry videogame</h1>
          <Link to="/home"> 
          <button className={LandingPageCss.landingPage__btn}>let's Play</button>   
          </Link>
        </div>
    )
}

export default LandingPage;