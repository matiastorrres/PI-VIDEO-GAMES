import {GET_ALL_VIDEOGAME,
        SEARCH_VIDEOGAME, 
        ORDER_BY_NAME, 
        ORDER_BY_RATING, 
        FILTER_BY_TYPE_ID, 
        GET_ALL_GENRES,
        FILTER_BY_GENRE,
        DETAIL,
        PLATFORM} from "./../typeActions";

export function getAllVideogame (){
    return function(dispatch){
        fetch("http://localhost:3001/videogame")
        .then(res=>res.json())
        .then(payload=>dispatch({ type:GET_ALL_VIDEOGAME , payload }))
        .catch(error=>console.log(error))
    }
}

export function searchVideogame(name){
    return function(dispatch){
        fetch(`http://localhost:3001/videogame?name=${name}`)
        .then(res=>res.json())
        .then(payload=>dispatch({ type:SEARCH_VIDEOGAME, payload }))
        .catch(error=>console.log(error))
    }
}

export function getaAllGenres(){
    return function(dispatch){
        fetch("http://localhost:3001/genre")
        .then(res=>res.json())
        .then(payload=>dispatch({type:GET_ALL_GENRES, payload}))
        .catch(error=>console.log(error))
    }
}

export function orderByName(order){
    console.log(order)
    return { type:ORDER_BY_NAME, payload:order }
}

export function orderByRating(order){
    console.log(order)
    return { type:ORDER_BY_RATING, payload:order }
}

export function filterByTypeId(filter){
   return {type:FILTER_BY_TYPE_ID, payload:filter}
}

export function filterByGenre(filter){
    return {type:FILTER_BY_GENRE, payload: filter}
}

export function getDetail (id){
    return function(dispatch){
        fetch(`http://localhost:3001/videogame/${id}`)
        .then(res=>res.json())
        .then(payload=>dispatch({type:DETAIL, payload}))
        .catch(error=>console(error))
    }
}

export function getPlatform (){
    return function(dispatch){
        fetch("http://localhost:3001/videogame/platform")
        .then(res=>res.json())
        .then(payload => dispatch ({type:PLATFORM, payload}))
        .catch(error=>console(error))
    }
}