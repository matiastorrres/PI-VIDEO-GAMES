import video from "../../img/loading.mp4"
import loadingCss from "./Loading.module.css"
function Loading (){
    return(
        <div>
            <div>
            <h1>Loading....</h1>
            </div>
            <div>
            <video autoPlay loop muted className={loadingCss.video}>
               <source src={video} type="video/mp4"/>
            </video>
            </div>
        </div>
    )
}

export default Loading;