import { Router } from "express";
import { prismaClient } from "@repo/db/client";
import { AuthRequest } from "../types/type";
import { createRoomSchema } from "@repo/common/types";

const roomRouter:Router=Router();

roomRouter.post('/createRoom',async (req:AuthRequest,res)=>{
 
    try{
        const {slug}=req.body;
        const adminId=req.userId as string;

        const reqBody={
            slug,
            adminId
        }

        const isValidReqBody=createRoomSchema.safeParse(reqBody);

        if(!isValidReqBody.success){
            res.status(400).json({error:"Incorrect data inputs!"});
            return;
        }

        const roomResp=await prismaClient.room.create({
            data:reqBody
        })
        
        res.status(201).json({roomId:roomResp.id});
    }
    catch(error){
        console.log('error: ',error);
        res.status(411).json({error});
    }

})

export default roomRouter;