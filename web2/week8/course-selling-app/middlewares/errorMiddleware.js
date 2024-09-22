
const errorMiddleware=(req,res)=>{
res.sendStatus(500);
}


module.exports=errorMiddleware;