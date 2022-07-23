import NavCss from "./Nav.module.css";
import {useDispatch} from "react-redux";
import { useState} from "react";
import {searchVideogame} from "../../redux/actions";


function Nav (){
    const [name, setName] = useState("")

    const dispatch =useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(searchVideogame(name));
        setName("");
    }
    
    return(
        <nav className={NavCss.nav__container}>
            <input type="text" placeholder="ingrese el video game" value={name} onChange={e=>setName(e.target.value)}/>
            <input type="submit" onClick={e=>handleSubmit(e)}/>
        </nav>
    )
}
export default Nav;