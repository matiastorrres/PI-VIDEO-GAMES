import Card from "../Card/Card";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {getAllVideogame} from "./../../redux/actions"

function Main () {
   // const [order, setOrder] = useState("")
    const dispatch = useDispatch();
    const allvideogame =useSelector(state=>state.allVideogame);
    useEffect(()=>{
        dispatch(getAllVideogame())
    },[dispatch]);

    return(
        <section>
            <Card allvideogame={allvideogame}/>
        </section>
    )
}

export default Main;