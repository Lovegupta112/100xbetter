const errorMiddleware=(err,req,res,next)=>{
    console.log('error: ',err);
res.status(500).json({error:err});
}


module.exports=errorMiddleware;