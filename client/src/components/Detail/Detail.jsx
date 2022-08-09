import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, cleanData} from "./../../redux/actions";
import { Link } from "react-router-dom";
import detailCss from "./Detail.module.css"
import Error from "../Error/Error"

import Loading from "../Loading/Loading";

function Detail (){
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch()
    const detail = useSelector(state=>state.detail)
    
    const {id} = useParams()
    console.log(id)


    useEffect(()=>{
        dispatch(getDetail(id));
    },[dispatch,id])
   
    useEffect(()=>{
        setLoading(true)
        return dispatch(cleanData());
    },[dispatch])

    const handleLoading = ()=>{
        setLoading(true)
        dispatch(cleanData())
    }
   


    if(Object.keys(detail).length > 0 && loading){
        setLoading(false)
    }
    if(loading) return <Loading/>
    return(
        <section className={detailCss.section}>
            <Link to="/home">
            <button onClick={handleLoading} className={detailCss.botton}>back
            </button>
            </Link>
            { detail.error?
            <Error/> :
           <div className={detailCss.Detail__container} >
           <h2 className={detailCss.Detail__title}>{detail.name}</h2>
           <img src= {detail.background_image} alt= "detail" className={detailCss.Detail__img}/>
           <ul className={detailCss.Detail__genres}> genres:   
           {detail.genres && detail.genres.map(e=><li key={e}> -- {e} -- </li>) }
           </ul>
           <ul className={detailCss.Detail__plataforms}> plataforms:   
           {detail.platforms && detail.platforms.map(e=> <li key={e}>-- {e} --</li>)} 
           </ul>
           <p className={detailCss.Detail__description}> description: {detail.description && detail.description.replace(/<[^>]+>/g, '')}</p>
           <p className={detailCss.Detail__released}>released: {detail.released}</p>
           <p>rating: {detail.rating}</p>
           </div>
           
            }
        </section>
    )
}

export default Detail;

//pregutar porque para renderizar hace falta usar ese condicional???sacarse esa dudad..
