const {Router} = require("express");
const router=Router();
const {getRengeDb} = require("./../controller/genre");
const {httpError} = require("../helpers/handleError");

router.get("/", async(req,res)=>{
    try {
        const genres = await getRengeDb()
        return res.json(genres)
    } catch (error) {
        return httpError(res,error)
    }
})


module.exports = router