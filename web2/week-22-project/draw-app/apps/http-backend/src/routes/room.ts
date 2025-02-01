import { Router } from "express";
import { prismaClient } from "@repo/db/client";
import { AuthRequest } from "../types/type";

const roomRouter:Router=Router();

roomRouter.post('/createRoom',async (req:AuthRequest,res)=>{
 
    try{
        const {slug}=req.body;
        const adminId=req.userId as string;

        const roomResp=await prismaClient.room.create({
            data:{
              slug,
              adminId
            }
        })
        
        res.status(201).json({roomId:roomResp.id});
    }
    catch(error){
        console.log('error: ',error);
        res.status(411).json({error});
    }

})

export default roomRouter;