const axios = require("axios");
const {Genre} =require("../db")
const {YOUR_API_KEY} = process.env;
const getGenreApi = () =>{
    return axios(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
    .then(resp=>resp.data.results)
    .then(resp=>{
        return resp.map(e=>{
            return {name:e.name}
        }) 
    })
    .catch(()=>console.log("aca es el error"))   
}

const getRengeDb = async () =>{
    const renge = await Genre.findAll({
       attributes:["name"]
    })
    return renge.map(e=>e.name)
}

module.exports = { getGenreApi, getRengeDb } 