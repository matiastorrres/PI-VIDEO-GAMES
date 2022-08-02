import errorCss from "./Error.module.css"

function Invalidate (){
    return(
        <div className={errorCss.error_container}>
            <h1>No se encontraron resultados</h1>
        </div>
    )
}

export default Invalidate;