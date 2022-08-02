const { Router, response } = require("express");
const router = Router();
const { allVideogames, searchVideogame, getDetailVideogameApi, getDetailVideogameDb, getPlatforms} = require("./../controller/videogame")
const {httpError} = require("../helpers/handleError")
const {Videogame, Genre} = require("./../db");

router.get("/", async (req,res)=>{
    const {name} = req.query
    try {
        if(name){
        const searchVideo =await searchVideogame(name)
        if(searchVideo.length>0) return res.json(searchVideo) 
        return res.json("no game found")
        }
        const videogames = await allVideogames()
        return res.json(videogames)
    } catch (error) {
        return httpError(res,error)
    }
}); 

router.get("/platform",async (req,res)=>{
    try {
        const platforms = await getPlatforms();
        res.json(platforms)   
    } catch (error) {
        return httpError(res,error)
    }
})

router.get("/:id",async(req, res)=>{
    const {id} = req.params;
    const expReg = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
    try {
        if(expReg.test(id)){
            const detailVideogame = await getDetailVideogameDb(id);
            if(detailVideogame) return res.json(detailVideogame)
            else return res.send("no game found aca")
        }else{
        const detailVideogame = await getDetailVideogameApi(id)
        if(detailVideogame) return res.json(detailVideogame)
        else return res.send("no game found")
        }
    } catch (error) {
        return httpError(res,error)
    }
})

router.post("/", async(req, res)=>{
    const {name, background_image, genres, description, released, rating, platforms} = req.body
    try {
        const [videogame, created] = await Videogame.findOrCreate({
            where:{
                name:name,
            },
            defaults:{
            name,
            background_image,
            description,
            released,
            rating,
            platforms,
            }
        })
         if(created===false) return res.status(500).send("existing videogame")
        console.log(genres)
         const genresDb = await Genre.findAll({
            where: {name: genres } //aca podemos mandar un array con todos los valores, no hace falta que pasemos uno por uno
        });
           
          await videogame.addGenres(genresDb)
          genresDb.map(e=>console.log(e.toJSON())) //me devulve un array de objetos
         return res.json("successfully created video game")
         
    } catch (error) {
        return httpError(res,error)
    }
})

module.exports = router