function Paginated ({numberOfVideogame, videogameByPage, handleNumberPage}){
    const numberPage=[];
    const calculationNumberPage=Math.ceil(numberOfVideogame/videogameByPage);
    for(let i=1; i <= calculationNumberPage; i++ ){
        numberPage.push(i)
    }
    return(
        <div>
            {
                numberPage.map(nro => <button key={nro} value={nro}onClick={e=>handleNumberPage(e.target.value)}> {nro} </button>)
            }
        </div>
    )
}

export default Paginated;