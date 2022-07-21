const axios = require("axios");
const {Genre} =require("../db")

const getGenreApi = () =>{
    return axios("https://api.rawg.io/api/genres?key=c11692bffe5f40318e7ff916c9786723")
    .then(resp=>resp.data.results)
    .then(resp=>{
        return resp.map(e=>{
            return {name:e.name}
        }) 
    })
    .catch(()=>console.log("paso algo"))   
}

const getRengeDb = async () =>{
    const renge = await Genre.findAll({
       attributes:["name"]
    })
    return renge.map(e=>e.name)
}

module.exports = { getGenreApi, getRengeDb } 