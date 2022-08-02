import {orderByName, orderByRating, filterByTypeId,getaAllGenres, filterByGenre,} from "./../../redux/actions"
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import asideCss from "./Aside.module.css"

function Aside ({setPage, setOrder, allvideogame}){
    const dispatch =useDispatch();
    const genres = useSelector(state=>state.allGenre);

    useEffect(()=>{
        dispatch(getaAllGenres())
    },[dispatch])

    const handleOrderByName = (e)=>{
        if(allvideogame==="no game found") return 
        dispatch(orderByName(e.target.value));
        setOrder(`order ${e.target.value}`)
    }

    const handleOrderByRating = (e)=>{
        if(allvideogame==="no game found") return 
        dispatch(orderByRating(e.target.value));
        setOrder(`order ${e.target.value}`)   
    }

    const hadleFilterByTypeId = (e)=>{
        if(allvideogame==="no game found") return
        dispatch(filterByTypeId(e.target.value));
        setPage(1)       
    }

    const handleFilterByGenre = (e)=>{
        if(allvideogame==="no game found") return 
        dispatch(filterByGenre(e.target.value));
        setPage(1)
    }

    return(
        <aside className={asideCss.Aside__container}>
            <div>
                <label>Choose a genres:  </label>
                <select onChange={e=>handleFilterByGenre(e)} name="genres">
                    <option value="all">All</option>
                    {
                    genres.map(e=>{
                        return (<option value={e} key={e}>{e}</option>)
                    }) 
                    }
                </select>
            </div>
            <div>
                <label >origen: </label>
                <select onChange={e=>hadleFilterByTypeId(e)}>
                    <option value="all">All</option>
                    <option value="api">existentes</option>
                    <option value="db">creados por el usuario</option>
                </select>
            </div>
            <div>
                <label >orden alfabetico: </label>
                <select onChange={e=>handleOrderByName(e)}>
                    <option value="all">----------</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
            </div>
            <div>
                <label>ordenar por puntaje</label>
                <select onChange={e=>handleOrderByRating(e)}>
                    <option value="all">------------</option>
                    <option value="des">mayor rating</option>
                    <option value="asc">menor rating</option>
                </select>
            </div>
        </aside>
    )
};

export default Aside;   