import jwt from 'jsonwebtoken';
import { NextFunction, Request,Response } from 'express';
const jwtSecret=process.env.JWT_SECRET as string;


interface Itoken{
    userId:string;
}

export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
try{
 const token=req.headers.authorization?.split(' ')[1] as string;
  const isAuthenticatedUser=jwt.verify(token,jwtSecret)  as Itoken;

  if(isAuthenticatedUser){
      req.headers.userId=isAuthenticatedUser.userId;
    next();
  }
}
catch(error){
    console.log('Error: ',error);
    res.sendStatus(403);
}
}