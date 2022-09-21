import {Link} from "react-router-dom";
import errorCss from "./Page404.module.css"

function Page404(){
    return(
      
        <div className={errorCss.error__container}>
            <h1 className={errorCss.error__titulo }>This page is not available.Sorry.Try searching for something else</h1>
            <Link to="/home">
             <button className={errorCss.error__btn}>back</button>
            </Link>
        </div>
        
    )
}
export default Page404;