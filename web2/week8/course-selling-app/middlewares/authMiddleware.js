const jwt=require('jsonwebtoken');
require('dotenv').config();

const authMiddleware=(req,res,next)=>{
 try{
  const authorization=req.headers.authorization;

  const verified= jwt.verify(authorization);
   
   if(verified){

   }
 }
 catch(error){
 
 }
}

module.exports={authMiddleware};
