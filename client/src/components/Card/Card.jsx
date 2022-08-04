import { Link } from "react-router-dom";
import cardCss from "./Card.module.css"


function Card ({currentVideogames}) {

    return(
        <section className={cardCss.Card__container}>
           { 
           currentVideogames.map(e=>{
            return(
                <div key={e.id} className={cardCss.card}>
                    <Link to={`/detail/${e.id}`} className={cardCss.card__title}>
                    <h1  >{e.name}</h1>
                    </Link>
                    <img src={e.background_image} alt="img" width="100px" height="100px"  className={cardCss.card__img}/>
                    <ul className={cardCss.card__genres}>
                    {e.genres.map(e=><li key={e}> -{e}- </li>)}
                    </ul>
                    <p className={cardCss.card__rating}>Rating: {e.rating? e.rating : "-"}</p>
                </div>)}) 
           }
        </section>
        
       
    )
}
export default Card;