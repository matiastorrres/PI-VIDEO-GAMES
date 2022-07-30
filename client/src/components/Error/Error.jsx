import { Link } from "react-router-dom";
import errorCss from "./Error.module.css"

function Invalidate (){
    return(
        <div className={errorCss.error_container}>
            <h3>Esta página no se encuentra disponible. Lo sentimos.Intenta buscar otra cosa</h3>
            <Link to="/home">
            <button>back</button>
            </Link>
        </div>
    )
}

export default Invalidate;