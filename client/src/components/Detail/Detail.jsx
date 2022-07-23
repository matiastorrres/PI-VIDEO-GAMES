import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail} from "./../../redux/actions";

function Detail (){

    const dispatch = useDispatch()
    const detail = useSelector(state=>state.detail)
    const {id} = useParams()

    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch,id])

    return(
        <div>
           <h2>{detail.name}</h2>
            <img src= {detail.background_image} alt= "detail"/>
           {detail.genres && detail.genres.map(e=><p key={e}> {e} </p>) }
           <p>{detail.description && detail.description.replace(/<[^>]+>/g, '')}</p>
           <p>{detail.released}</p>
           <p>{detail.rating}</p>
           {detail.platforms && detail.platforms.map(e=> <p key={e}>{e}</p>)} 
        </div>
    )
}

export default Detail;

//pregutar porque para renderizar hace falta usar ese condicional???sacarse esa dudad..
