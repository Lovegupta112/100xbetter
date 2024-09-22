const jwt=require('jsonwebtoken');
require('dotenv').config();
const jwtSecret=process.env.JWT_SECRET_KEY;


const authUserMiddleware=(req,res,next)=>{
 try{
  const authorization=req.headers.authorization;

  const verified= jwt.verify(authorization,jwtSecret);
   
   if(verified && verified.role=='user'){
        next();
   }
   else{
    res.sendStatus(401);
   }
 }
 catch(error){
    res.sendStatus(401);
 }
}
const authAdminMiddleware=(req,res,next)=>{
 try{
  const authorization=req.headers.authorization;

  const verified= jwt.verify(authorization,jwtSecret);

   if(verified && verified.role=='admin'){
        next();
   }
   else{
    res.sendStatus(401);
   }
 }
 catch(error){
    res.sendStatus(401);
 }
}

module.exports={authUserMiddleware,authAdminMiddleware};
