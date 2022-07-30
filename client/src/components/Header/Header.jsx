import HeaderCss from "./Header.module.css";
import {Link} from "react-router-dom"
function Header (){

    const refreshPage = ()=>{
        window.location.reload()
    }
    return(
        <header className={HeaderCss.header__container}>
            <p>soy el header</p>
            <button onClick={refreshPage}>refresh</button>
            <Link to={"/create"}>
            <p>vamos a crear un video game</p>
            </Link>
        </header>
    )
}
export default Header;