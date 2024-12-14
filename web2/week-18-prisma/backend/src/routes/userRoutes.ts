import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const jwtSecret=process.env.JWT_SECRET as string;
const userRouter = Router();
const prisma = new PrismaClient();

userRouter.get("/all-users", async (req, res) => {
  try {
    const userData = await prisma.user.findMany();
    res.send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.post('/create-user',async(req,res)=>{
    try{
       const {name,email,password}=req.body;
       const userData=await prisma.user.create({data:{
        name,
        email,
        password
       }})
       console.log('userData..',userData);
       const token=jwt.sign({userId:userData.id},jwtSecret); 
       res.setHeader('authorization',`Bearer ${token}`);
       res.status(200).send('User created successfully !');
    }
    catch(error){
        res.status(400).send(error);
    }
})

userRouter.put('/update-user/:email',async(req,res)=>{
  try{
   const updateFields=req.body.updateFields;
   const {email}=req.params;
   
   const updatedRes=await prisma.user.update({
    where:{
      email
    },
    data:{
     ...updateFields
    }
   })
   console.log('49..',updatedRes);
  }
  catch(error){
    res.status(400).send(error);
  }
})
export default userRouter;