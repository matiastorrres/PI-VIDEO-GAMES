//const { YOUR_API_KEY, URL_API } = process.env; //ver despues porque no me funciona
//`${URL_API}/1?key=${YOUR_API_KEY}`  //ver despues porque no me funciona
const axios = require("axios");
const {Videogame, Genre} = require("./../db");
const {Op} = require ("sequelize");


const getVideogamesApi = () => {
    const arrayOfPromises = [];
    for(let i=1; i<=5; i++){
        arrayOfPromises.push( new Promise((resolve , reject)=>{
             axios(`https://api.rawg.io/api/games?key=c11692bffe5f40318e7ff916c9786723&page=${i}`)
            .then(res =>resolve(res.data.results))
            .catch((error)=>reject(error))
        }))
    }
    
    return Promise.all(arrayOfPromises)
    .then(result => (result.flat()))
    .then(result =>{
        videogamesApi=[]
        result.forEach( e => {
        videogamesApi.push({
             name:e.name,
             id:e.id,
             background_image: e.background_image,
             genres: e.genres.map(e=>e.name),
             rating: e.rating,
             platforms: e.platforms.map(e=>e.platform.name)
            })
        })
        return videogamesApi
    })
    .catch((error)=>console.log(error))
}

const getVideogamesDb = async ()=>{
    const videogames =await Videogame.findAll({
        attributes:["name","id","background_image", "rating"],
        include:[{
            model: Genre,
            attributes: ["name"],
            through: { attributes: [] }
        }]
     })
     return videogames.map(e=>{
        return{
            name:e.name,
            id:e.id,
            background_image: e.background_image,
            genres: e.Genres.map(e=>e.name),
            rating: e.rating
        }
     })
}

const allVideogames = async ( ) => {
    const videogameApi = await getVideogamesApi();
    const videogameDb = await getVideogamesDb();
    const videogames =[...videogameApi, ...videogameDb];
    return videogames
}

const searchVideogameApi = (name) => {
    return axios(`https://api.rawg.io/api/games?search=${name}&key=c11692bffe5f40318e7ff916c9786723`)
    .then(result=>result.data.results)
    //.then(res=>console.log(res))
    .then(result =>{
        videogameApi=[]
        result.forEach( e => {
         videogameApi.push({
             name:e.name,
             id:e.id,
             background_image: e.background_image,
             genres: e.genres.map(e=>e.name)
            })
        })
        return videogameApi
    })
    .catch(()=>console.log("hubo un error"))
    
}

const searchVideogameDb = async(name1) => {
    const videogames = await Videogame.findAll({
        where:{ name: {[Op.substring]:`${name1}`}},
        attributes:["name","id","background_image"],
        include:[{
            model: Genre,
            attributes:["name"],
            through: {attributes:[]}
        }],
        order: [['name', 'ASC']]   
    })
    return videogames.map(e=>{
        return{
            name:e.name,
            id:e.id,
            background_image: e.background_image,
            genres: e.Genres.map(e=>e.name)
        }
     })
}

//aca queda implementar el metodo sort 
const searchVideogame = async (name) =>{
    const videogameApi = await searchVideogameApi(name);
    const videogameDb = await searchVideogameDb(name);
    const videogame =[...videogameDb,...videogameApi];
    return videogame.slice(0,15)
}

const getDetailVideogameApi = (id)=>{
    return axios(`https://api.rawg.io/api/games/${id}?key=c11692bffe5f40318e7ff916c9786723`)
    .then(resp=>resp.data)
    .then(data =>{
        return{
            name: data.name,
            id:data.id,
            background_image: data.background_image,
            genres: data.genres.map(e=>e.name),
            description: data.description,
            released: data.released,
            rating: data.rating,
            platforms: data.platforms.map(e=>e.platform.name)
        }
    })
};

const getDetailVideogameDb = async (id) =>{
     let videogame = await Videogame.findByPk(id,{
        include:[{
            model: Genre,
            attributes: ["name"],
            through: { attributes: [] }
        }]
    })

    videogame = videogame.toJSON()
    videogame.genres= videogame.Genres.map(e=>e.name)
    delete videogame.Genres
    return videogame
}

const getPlatforms = async()=>{
    const videogame = await getVideogamesApi()
    const platforms = videogame.map(e=>e.platforms).flat()
    const platform= [...new Set(platforms)]
    return platform
}


module.exports={
    allVideogames,
    searchVideogame,
    getDetailVideogameApi,
    getDetailVideogameDb,
    getPlatforms
}