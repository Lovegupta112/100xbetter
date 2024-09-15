const jwt=require('jsonwebtoken');
const JWT_SECRET='My123'


function auth(req,res,next){

    try{

    
    const token=req.headers.token;
    const decodedToken=jwt.verify(token,JWT_SECRET);

    if(decodedToken){
        req.username=decodedToken.name;
        next();
    }
    // else{
    //     res.status(403).send("Invalid Token!");
    // }
}
catch(error){
    res.status(401).send("Invalid Token!");
}
  

}

module.exports=auth;