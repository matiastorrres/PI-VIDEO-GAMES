import Card from "../Card/Card";
import Header from "../Header/Header";
import Aside from "../Aside/Aside";
import Paginated from "../Paginated/Paginated";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import {getAllVideogame} from "./../../redux/actions"



function Main () {
    const [order, setOrder] = useState("");
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch();
    const allvideogame =useSelector(state=>state.allVideogame);

    useEffect(()=>{
        dispatch(getAllVideogame())
    },[dispatch]);
    

    //PAGINATED
    const [page,setPage]=useState(1);
    const videogameByPage=15;
    const indexOfLastCard= page * videogameByPage;
    const indexOfFirstCard= indexOfLastCard - videogameByPage;
    const currentVideogames= allvideogame.slice(indexOfFirstCard, indexOfLastCard);
    const calculationNumberPage= Math.ceil(allvideogame.length/videogameByPage);
    //console.log(calculationNumberPage)
    //console.log(page)

    const handleNumberPage=(number)=>{
        setPage(parseInt(number))
    }
    const goToNextPage = ()=>{
        if(page < calculationNumberPage)
        setPage(page + 1)
    }
    const goToPreviousPage = () =>{
        if(page > 1) setPage(page - 1)
    }
    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
      }, [page]);


    if(allvideogame.length >0 && loading){
        setLoading(false);
    }

    if(loading ) return(<Loading/>)
    return(
        <section>
            <Header setPage={setPage}/>
            <Aside setPage={setPage} order={order} setOrder={setOrder}/>
            <Paginated
            calculationNumberPage={calculationNumberPage}
            handleNumberPage={handleNumberPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}/>
            <Card currentVideogames={currentVideogames}/>
            <Paginated 
            calculationNumberPage={calculationNumberPage} 
            handleNumberPage={handleNumberPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}/>
        </section>
    )
}

export default Main;