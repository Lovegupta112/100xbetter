import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const todoRouter = Router();
const prisma = new PrismaClient();

todoRouter.get("/all-todos", async (req, res) => {
    try{
      const {userId}=req.headers;
      const todos=await prisma.todo.findMany({
        where:{
         userId:Number(userId)
        }
      })
      res.send(todos);
    }
    catch(error){
        res.sendStatus(500);
    }
});

todoRouter.post("/create-todo",async(req,res)=>{
  try{
    const {userId}=req.headers;
    const {title}=req.body;
    const createdTodo=await prisma.todo.create({
      data:{
        title,
        userId:Number(userId)
      }
    })
    res.status(200).send('Todo created SuccessFully !');
  }
  catch(error){
    res.status(400).send(error);
  }
})

export default todoRouter;