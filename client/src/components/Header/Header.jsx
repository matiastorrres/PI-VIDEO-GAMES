import HeaderCss from "./Header.module.css";
import {Link} from "react-router-dom"
function Header (){
    return(
        <header className={HeaderCss.nav__container}>
            <p>soy el header</p>
            <Link to={"/create"}>
            <p>vamos a crear un video game</p>
            </Link>
        </header>
    )
}
export default Header;