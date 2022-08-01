import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getPlatform, getaAllGenres, getAllVideogame} from "../../redux/actions"
import {Link, useHistory} from "react-router-dom"
import formCss from "./Create.module.css";
import Loading from "../Loading/Loading";
function Create (){
    const[loading,setLoading]=useState(true)
    const[input, setInput] =useState({
        name:"",
        description:"",
        released:"",
        background_image:"",
        rating:"",
        genres:[],
        platforms:[]
    })
    const [errors, setErrors] = useState({})
    const [repeat, setRepeat] = useState(false)

    const allPlatform= useSelector(state=>state.allPlatform);
    const allGenre= useSelector(state=>state.allGenre);
    const allVideogame= useSelector(state=>state.allVideogame)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        dispatch(getPlatform());
        dispatch(getaAllGenres());
        dispatch(getAllVideogame());
    },[dispatch]);


    function handleChange(e) {
        setInput((input) => ( { ...input, [e.target.name]: e.target.value } ));
    }
    function validateName (value) {
        const string =  /^[a-zA-Z0-9-() .]+$/
        if(!string.test(value) || !value || value.length > 255) 
        setErrors({...errors, name: "Este campo es obligatorio, se aceptan letras, numeros, guiones medios, parentesis y como maximo 255 caracteres"})
        else setErrors({...errors, name:false})
    }
    function handleRepeat(value){
        const repeat=allVideogame.filter(e=>e.name===value);
        if(repeat.length > 0) setRepeat("nombre existente")
        else setRepeat(false)
    }
    function validateDescription (value) {
        const string =  /^[a-zA-Z0-9-() .]+$/
        if(!string.test(value) || !value) setErrors({...errors, description: "Este campo es obligatorio, se aceptan letras, numeros, guiones medios y parentesis"})
        else setErrors({...errors, description:false})
    }
   
   function validateReleased (value){
       const validate = /^\d{4}([-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/
       let year = parseInt(String(value).substring(0,4));
       let month = parseInt(String(value).substring(5,7));
       let day = parseInt(String(value).substring(8,10));
       let dateEntered = new Date(year,month,day+1);
       let maxDate = new Date();
       let minDate = new Date(1952,1,1);
       if(dateEntered > maxDate || dateEntered <minDate || !validate.test(value)) 
       setErrors({...errors, released: "la fecha a ingresar debe menor a la actual y mayor al año 1952"})
       else setErrors({...errors, released:false});
    }
   function validateRating(value){
    const validar = /^\d*(\.\d{1})?\d{0,1}$/
      if(value > 5 || value < 0 || !validar.test(value)) 
      setErrors({...errors, rating:"debe ser mayor a 0 y menor a 5, puede contener dos decimales separados por un punto de la parte enteras"})
      else setErrors({...errors, rating:false});
    }
    function validateImagen(value){
        const img = /(https?:\/\/.*\.(?:png|jpg))/
        if(value && !img.test(value)) setErrors({...errors, background_image:"el valor ingresado no corresponde a una dirreccion de imagen"})
        else setErrors({...errors, background_image:false});
    }
    function genreCheck(e){
        if(!e.target.checked) setInput(input=>{ return {...input, genres: input.genres.filter(el=>el !==e.target.value)} })
        if(e.target.checked) setInput(input=>{ return {...input,genres:[...input.genres, e.target.value] } })
    }
    function platformCheck(e){
        if(!e.target.checked) setInput(input=>{ return {...input, platforms: input.platforms.filter(el=>el !==e.target.value)} })
        if(e.target.checked) setInput(input=>{ return {...input,platforms:[...input.platforms, e.target.value] } })
    }

    const handlepost = async (e)=> {
        e.preventDefault();
        console.log("aca", input)
        if( errors.name || errors.description || errors.released || errors.rating) return alert("solucione los errores");
        const post={
            name:input.name,
            description: input.name,
            genres:input.genres,
            platforms:input.platforms
        }
        if(input.rating) post.rating=input.rating
        if(input.released) post.released=input.released
        if(input.background_image) post.background_image=input.background_image
        console.log(post)
        await fetch("http://localhost:3001/videogame/",{
            method: "POST",
            body:JSON.stringify(post),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(res=>console.log(res))
        .catch(error=>console.log(error))
        setInput({
        name:"",
        description:"",
        released:"",
        background_image:"",
        rating:"",
        genres:[],
        platforms:[]
        })
        alert("el juego se creo exitosamente")
        history.push("/home")
    }
    console.log(allPlatform.length)
    if(allPlatform.length > 0 && loading){
        setLoading(false);
    }
    if(loading) return <Loading/>

    return(
        <section className={formCss.section}>
            <Link to="/home">
            <button  className={formCss.botton}>back
            </button>
            </Link>
            <form onSubmit={handlepost} className={formCss.Form__container}>  
            <div className={formCss.Form__name}>
                <label className={formCss.Form__label} >Videogame name: </label>
                <input type="text" 
                className={formCss.Form__input}
                value={input.name} 
                name="name" 
                onChange={ (e)=> { handleChange(e); validateName(e.target.value) ; handleRepeat(e.target.value) } } />
                {errors.name? <p className={formCss.Form__error}>{errors.name}</p> : null}
                {repeat? <p>{repeat}</p> : null}
            </div>
            <div className={formCss.Form__description}>
                <label className={formCss.Form__label}>Description: </label>
                <textarea name="description"
                rows="5" 
                cols="100" 
                value={input.description} 
                onChange={(e)=>handleChange(e)}
                onBlur={(e)=>validateDescription(e.target.value)}/>
                {errors.description? <p className={formCss.Form__error}> {errors.description} </p> : null}
            </div>
            <div className={formCss.Form__date}>
                <label className={formCss.Form__label} >release date: </label>
                <input type="date" 
                name="released" 
                value={input.released} 
                onChange={(e)=>{handleChange(e) ; validateReleased(e.target.value)}}/>
                {errors.released? <p className={formCss.Form__error}> {errors.released} </p> : null}
            </div>
            <div className={formCss.Form__rating}>
                <label className={formCss.Form__label}>Rating: </label>
                <input type="number" 
                name="rating" 
                value={input.rating} 
                onChange={(e)=>{handleChange(e) ; validateRating(e.target.value)}} />
                {errors.rating? <p className={formCss.Form__error} >{errors.rating}</p> : null}
            </div>
            <div className={formCss.Form__img}>
                <label className={formCss.Form__label}>Image: </label>
                <input type="url" 
                value={input.background_image} 
                name="background_image" 
                onChange={(e)=>handleChange(e)} 
                onBlur={(e)=>validateImagen(e.target.value)}/>
                {errors.background_image? <p className={formCss.Form__error} >{errors.background_image}</p> : null}
            </div>
            <div className={formCss.Form__genres}>
                {allGenre.map(e => 
                <label key={e} className={formCss.Form__label}> {e} <input type="checkbox" key={e} value={e} onChange={e=>{genreCheck(e)}}/> 
                </label>)}
                {errors.genres? <p>{errors.genres}</p> : null}
            </div>
            <div className={formCss.Form__platform}>
                {allPlatform.map(e =>
                <label key={e} className={formCss.Form__label}> {e} <input type="checkbox" key={e} value={e} onChange={e=>{platformCheck(e)}} /> 
                </label>)}
            </div>
                <input type="submit" 
                value="to create"
                disabled={!input.name || !input.genres.length || !input.platforms.length || repeat || !input.description}  />             
            </form>
        </section>
    )
}

export default Create;