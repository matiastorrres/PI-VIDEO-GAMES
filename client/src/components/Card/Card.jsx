import { Link } from "react-router-dom";
function Card ({allvideogame}) {
    return(
        <section>
           {
           allvideogame.map(e=>{
            return(
                <div key={e.id}>
                    <Link to={`/detail/${e.id}`}>
                    <h3 key={e.name}>{e.name}</h3>
                    </Link>
                    <img src={e.background_image} alt="img" width="100px" height="100px" key={e.background_image}/>
                    {e.genres.map(e=><p key={e}>{e}</p>)}
                </div>)})
           }
        </section>
        
       
    )
}
export default Card;