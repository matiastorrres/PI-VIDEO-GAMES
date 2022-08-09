import axios from "axios";

import {GET_ALL_VIDEOGAME,
        SEARCH_VIDEOGAME, 
        ORDER_BY_NAME, 
        ORDER_BY_RATING, 
        FILTER_BY_TYPE_ID, 
        GET_ALL_GENRES,
        FILTER_BY_GENRE,
        DETAIL,
        PLATFORM,
        CLEAN_DATA} from "./../typeActions";

export function getAllVideogame (){
    return function(dispatch){
        axios("/videogame")
        .then(res=>res.data)
        .then(payload=>dispatch({ type:GET_ALL_VIDEOGAME , payload }))
        .catch(error=>console.log(error))
    }
}

export function searchVideogame(name){
    return function(dispatch){
        axios(`/videogame?name=${name}`)
        .then(res=>res.data)
        .then(payload=>dispatch({ type:SEARCH_VIDEOGAME, payload }))
        .catch(error=>console.log(error))
    }
}

export function getaAllGenres(){
    return function(dispatch){
        axios("/genre")
        .then(res=>res.data)
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
        axios(`/videogame/${id}`)
        .then(res=>res.data)
        .then(payload=>dispatch({type:DETAIL, payload}))
        .catch(error=>console(error))
    }
}

export function getPlatform (){
    return function(dispatch){
        axios("/videogame/platform")
        .then(res=>res.data)
        .then(payload => dispatch ({type:PLATFORM, payload}))
        .catch(error=>console(error))
    }
}

export function cleanData() {
    return {type: CLEAN_DATA, payload: {}}
}