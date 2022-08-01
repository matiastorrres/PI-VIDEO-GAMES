const httpError = (res, err)=>{
  console.log(err)  
  res.status(500);
  res.send({error:"hay un error" })
}
module.exports={
    httpError
}