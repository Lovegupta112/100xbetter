const jwt=require('jsonwebtoken');
const jwtsecret='MYTodo!@#@#$';

const authMiddleware=(req,res,next)=>{

   try {
    const {authorization}=req.headers;

    if(authorization){
                 
        const decode=jwt.verify(authorization,jwtsecret);
        if(decode){
            req.headers.userId=decode.userId;
            next();
        }
    }else{
        res.status(401).send("Invalid Credentials!");
    }
   } catch (error) {
     res.status(401).send("Invalid Credentials !");
   }
}


module.exports=authMiddleware;