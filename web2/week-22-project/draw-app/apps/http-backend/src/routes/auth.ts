import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
import {signinSchema,signupSchema} from "@repo/common/types";
import bcrypt from "bcrypt";
const saltRounds = 10;

const authRouter: Router = Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isValidReqBody=signupSchema.safeParse(req.body);
    
    if(!isValidReqBody.success){
      res.status(400).json({error:"Incorrect data inputs!"})
    }

    const isUserExist = await prismaClient.user.findFirst({ where: {email} });

    console.log('isUserExist',isUserExist);
    if (isUserExist) {
      res.status(409).json({ error: "Email already exist" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const reqBody = {
      name: username,
      email,
      password: hashedPassword,
    };

    console.log('28..',reqBody);

    await prismaClient.user.create({
      data: reqBody,
    });
    res.status(200).send("successfully signedup!");
  } catch (error) {
    res.sendStatus(500);
  }
});

authRouter.post("/signin", async (req, res) => {
 try{
  const { email, password } = req.body;

  const isValidReqBody=signinSchema.safeParse(req.body);

  if(!isValidReqBody.success){
     res.status(400).json({error:"Incorrect data inputs!"});
     return;
  }

  const isUserExist = await prismaClient.user.findFirst({
    where: {email},
  });

  if (!isUserExist) {
    res.status(404).json({ message: "Email doesn't exist." });
    return;
  }

  const isCorrectPassword = await  bcrypt.compare(password, isUserExist.password);

  if (!isCorrectPassword) {
    res.status(404).json({ message: "Incorrect Password." });
    return;
  }

  const token = jwt.sign({ userId:isUserExist.id }, JWT_SECRET_KEY);

  res.cookie('jwt',token,{
    httpOnly:true,
    maxAge:360000,
    secure:process.env.NODE_ENV=='production',
    sameSite: 'strict',
  })


  res.status(200).json({ message: "Successfully signed In !", token });

 }
 catch(error){
  res.sendStatus(500);
 }
});

export default authRouter;
