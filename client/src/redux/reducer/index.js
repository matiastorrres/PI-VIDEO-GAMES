import { GET_ALL_VIDEOGAME, 
         SEARCH_VIDEOGAME, 
         ORDER_BY_NAME, 
         ORDER_BY_RATING, 
         FILTER_BY_TYPE_ID, 
         GET_ALL_GENRES, 
         FILTER_BY_GENRE,
         DETAIL,
         PLATFORM} from "../typeActions";

import {orderName, orderRating, filterTypeId, filterGenre } from "../../controllers"


const initialState={
    allVideogame:[],
    aux: [],
    allGenre:[],
    detail:{},
    allPlatform:[]
}

const rootReducer = (state = initialState, action) =>{

    switch(action.type){
        
        case GET_ALL_VIDEOGAME:
            return {...state, allVideogame: action.payload, aux:action.payload}

        case SEARCH_VIDEOGAME:
            return {...state, allVideogame: action.payload, aux:action.payload}

        case GET_ALL_GENRES:
            return {...state, allGenre: action.payload}
        
        case PLATFORM:
            return {...state, allPlatform: action.payload}

        case ORDER_BY_NAME:
            const name = orderName(action, state)
            console.log(name)
            return {...state, allVideogame: name }

        case ORDER_BY_RATING:
            const rating = orderRating(action, state)
            console.log(rating)
            return{...state, allVideogame: rating}

        case FILTER_BY_TYPE_ID:
            const id = filterTypeId(action,state);
            console.log(id)
            return {...state, allVideogame: id}

        case FILTER_BY_GENRE:
            const genre = filterGenre(action,state);
            console.log(genre)
            return {...state, allVideogame: genre}

        case DETAIL:
            console.log(action.payload)
            return {...state, detail: action.payload}
            
        default:
            return {...state}
    }
}

export default rootReducer;