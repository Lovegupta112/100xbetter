const jwt=require('jsonwebtoken');
require('dotenv').config();
const jwtAdminSecret=process.env.JWT_ADMIN_SECRET;
const jwtUserSecret=process.env.JWT_USER_SECRET;


const authUserMiddleware=(req,res,next)=>{
 try{
  const authorization=req.headers.authorization;

  const verified= jwt.verify(authorization,jwtUserSecret);

  console.log('verified 13..',verified);
   if(verified ){
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

  const verified= jwt.verify(authorization,jwtAdminSecret);

   if(verified){ 
      req.adminId=verified.userId
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
