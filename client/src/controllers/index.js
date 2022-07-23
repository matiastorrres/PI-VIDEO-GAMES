
export function orderName (action, state) {
    const order = action.payload === 'az' ?
    state.allVideogame.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
        return 0;
    }) :
    state.allVideogame.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if (b.name.toLowerCase() < a.name.toLowerCase()) return -1;
        return 0;
    });
    return order
}

export function orderRating (action, state) {
    const order = action.payload === 'asc' ?
    state.allVideogame.sort((a, b) => {
        if (a.rating > b.rating) return 1;
        if (b.rating > a.rating) return -1;
        return 0;
    }) :
    state.allVideogame.sort((a, b) => {
        if (a.rating < b.rating) return 1;
        if (b.rating < a.rating) return -1;
        return 0;
    });
    return order
}

export function filterTypeId(action, state){
    if( action.payload === 'api'){
        const filter = state.allVideogame.filter(e=> typeof e.id === 'number')
        return filter
    }else{
        const filter = state.allVideogame.filter(e=> typeof e.id !== "number")
        return filter
    }
}

export function filterGenre(action,state){
    const genre = state.allVideogame.filter(e=>e.genres.includes(action.payload))
    return genre
}