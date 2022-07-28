import Card from "../Card/Card";
import Nav from "../Nav/Nav";
import Aside from "../Aside/Aside";
import Paginated from "../Paginated/Paginated";
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import {getAllVideogame} from "./../../redux/actions"

function Main () {

    const dispatch = useDispatch();
    const allvideogame =useSelector(state=>state.allVideogame);

    useEffect(()=>{
        dispatch(getAllVideogame())
    },[dispatch]);

    //PAGINATED
    const [page,setPage]=useState(1);
    const [videogameByPage, setCarByPage]=useState(15);
    const indexOfLastCard= page * videogameByPage
    const indexOfFirstCard= indexOfLastCard - videogameByPage
    const currentVideogames= allvideogame.slice(indexOfFirstCard, indexOfLastCard)

    const handleNumberPage=(number)=>{
        setPage(number)
    }


    return(
        <section>
            <Nav/>
            <Aside setPage={setPage}/>
            <Paginated numberOfVideogame={allvideogame.length} videogameByPage={videogameByPage} handleNumberPage={handleNumberPage}/>
            <Card currentVideogames={currentVideogames} />
            <Paginated numberOfVideogame={allvideogame.length} videogameByPage={videogameByPage } handleNumberPage={handleNumberPage}/>
        </section>
    )
}

export default Main;