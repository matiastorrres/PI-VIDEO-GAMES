import {orderByName, orderByRating, filterByTypeId,getaAllGenres, filterByGenre,} from "./../../redux/actions"
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import asideCss from "./Aside.module.css"

function Aside ({setPage, order, setOrder}){
    const dispatch =useDispatch();
    const genres = useSelector(state=>state.allGenre);

    useEffect(()=>{
        dispatch(getaAllGenres())
    },[dispatch])

    const handleOrderByName = (e)=>{
        dispatch(orderByName(e.target.value));
        setOrder(`order ${e.target.value}`)
    }

    const handleOrderByRating = (e)=>{
        dispatch(orderByRating(e.target.value));
        setOrder(`order ${e.target.value}`)   
    }

    const hadleFilterByTypeId = (e)=>{
        dispatch(filterByTypeId(e.target.value));
        setPage(1)       
    }

    const handleFilterByGenre = (e)=>{
        dispatch(filterByGenre(e.target.value));
        setPage(1)
    }

    return(
        <aside className={asideCss.Aside__container}>
            <label >Choose a genres: </label>
            <select onChange={e=>handleFilterByGenre(e)} name="genres">
                <option value="all">All</option>
                {
                   genres.map(e=>{
                    return (<option value={e} key={e}>{e}</option>)
                   }) 
                }
            </select>
            <label >origen: </label>
            <select onChange={e=>hadleFilterByTypeId(e)}>
                <option value="all">All</option>
                <option value="api">existentes</option>
                <option value="db">creados por el usuario</option>
            </select>
            <label >orden alfabetico: </label>
            <select onChange={e=>handleOrderByName(e)}>
                <option value="all">----------</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
            </select>
            <label>ordenar por puntaje</label>
            <select onChange={e=>handleOrderByRating(e)}>
                <option value="all">------------</option>
                <option value="des">mayor rating</option>
                <option value="asc">menor rating</option>
            </select>
        </aside>
    )
};

export default Aside;   