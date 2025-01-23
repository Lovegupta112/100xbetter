import { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";
const saltRounds = 10;

const authRouter: Router = Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isUserExist = await prismaClient.user.findFirst({ select: email });

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

    await prismaClient.user.create({
      data: reqBody,
    });
    res.status(200).send("successfully signedup!");
  } catch (error) {
    res.sendStatus(500);
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const isUserExist = await prismaClient.user.findFirst({
    where: email,
  });

  if (!isUserExist) {
    res.status(404).json({ message: "Email doesn't exist." });
    return;
  }

  const isCorrectPassword = bcrypt.compare(password, isUserExist.password);

  if (!isCorrectPassword) {
    res.status(404).json({ message: "Incorrect Password." });
    return;
  }

  const token = jwt.sign({ email }, JWT_SECRET_KEY);

  res.cookie('jwt',token,{
    httpOnly:true,
    maxAge:3600,
    secure:process.env.NODE_ENV=='production'
  })

  res.status(200).json({ message: "Successfully signed In !", token });
});

export default authRouter;
