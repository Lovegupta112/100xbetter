import { Router } from "express";
import { prismaClient } from "@repo/db/client";

const chatRouter:Router=Router();


chatRouter.get('/:roomId',async (req,res)=>{
    try{
      const roomId=req.params.roomId && Number(req.params.roomId);
      if(!roomId){
        res.status(400).json({error:"Invalid roomId."});
        return;
      }
      const messages= await prismaClient.chat.findMany({
       where:{
        roomId
       }
      })

      console.log('16..',messages);
      res.status(200);
    }
    catch(error){
       res.sendStatus(500);
    }
})

export default chatRouter;