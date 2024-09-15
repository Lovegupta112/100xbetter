
function LoggerMiddleware(req,res,next){
 
    console.log(`Request : ${req.method} for route: `,req.url);
    next();
}


module.exports=LoggerMiddleware;