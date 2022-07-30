import { Link } from "react-router-dom";
import LandingPageCss from "./LandingPage.module.css";

function LandingPage () {
    return(
        <div className={LandingPageCss.landingPage__container}>
          <h1 className={LandingPageCss.landingPage__titulo}>welcome to henry videogame</h1>
          <Link to="/home"> 
          <button className={LandingPageCss.landingPage__btn}>let's eat</button>   
          </Link>
          <h2 className={LandingPageCss.landingPage__texto}>Here you will find recipes to cook delicious dishes according to your diet and you can also share your own recipes</h2> 
        </div>
    )
}

export default LandingPage;