import Nav from "../Nav/Nav"
import HeaderCss from "./Header.module.css";
import {Link} from "react-router-dom"
function Header ({setPage}){

    const refreshPage = ()=>{
        window.location.reload()
    }
    return(
        <header className={HeaderCss.header__container}>    
            <button onClick={refreshPage}>HENRY GAMES</button>
            <Nav setPage={setPage}/>
            <Link to={"/create"}>
            <button>CREATE VIDEOGAME</button>
            </Link>
            
        </header>
    )
}
export default Header;