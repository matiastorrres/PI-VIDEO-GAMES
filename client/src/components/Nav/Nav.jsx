import NavCss from "./Nav.module.css";
import {useDispatch} from "react-redux";
import { useState} from "react";
import {searchVideogame} from "../../redux/actions";


function Nav ({setPage}){
    const [name, setName] = useState("")

    const dispatch =useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(searchVideogame(name));
        setPage(1);
    }
    
    return(
        <nav className={NavCss.nav__container}>
            <input type="text" placeholder="find your game" value={name} onChange={e=>setName(e.target.value)} className={NavCss.nav__input}/>
            <input type="submit" onClick={e=>handleSubmit(e)} className={NavCss.nav__inputSubmit}/>
        </nav>
    )
}
export default Nav;