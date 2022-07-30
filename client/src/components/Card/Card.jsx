import { Link } from "react-router-dom";
import cardCss from "./Card.module.css"
import Error from "../Error/Error"

function Card ({currentVideogames}) {
    return(
        <section className={cardCss.Card__container}>
           { currentVideogames.length > 0?
           currentVideogames.map(e=>{
            return(
                <div key={e.id} >
                    <Link to={`/detail/${e.id}`}>
                    <h3>{e.name}</h3>
                    </Link>
                    <img src={e.background_image} alt="img" width="100px" height="100px"  />
                    {e.genres.map(e=><p key={e} >{e}</p>)}
                    <p>{e.rating}</p>
                </div>)}) 
                : <Error />
           }
        </section>
        
       
    )
}
export default Card;