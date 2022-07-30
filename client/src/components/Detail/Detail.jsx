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
        <div className={detailCss.Detail__container}>
            <Link to="/home">
            <div onClick={handleLoading}>back</div>
            </Link>
            { detail.error?
            <Error/> :
           <div>
           <h2>{detail.name}</h2>
            <img src= {detail.background_image} alt= "detail" height="500px"/>
           <div> genres:
           {detail.genres && detail.genres.map(e=><p key={e}> {e} </p>) }
           </div>
           <div> description:
           <p>{detail.description && detail.description.replace(/<[^>]+>/g, '')}</p>
           </div>
           <p>released: {detail.released}</p>
           <p>rating: {detail.rating}</p>
           <div> plataforms: 
           {detail.platforms && detail.platforms.map(e=> <p key={e}>{e}</p>)} 
           </div>
           </div>
            }
        </div>
    )
}

export default Detail;

//pregutar porque para renderizar hace falta usar ese condicional???sacarse esa dudad..
