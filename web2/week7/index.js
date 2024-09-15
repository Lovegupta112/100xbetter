const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { TodoModel, UserModel } = require("./db");
const jwtsecret = "MYTodo!@#@#$";
const auth = require("./middlewares/authMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");
const validationMiddleware=require('./middlewares/validationMiddleware');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

mongoose.connect(
  process.env.MONGODB_URI
);

app.use(express.json());

app.post("/signup",validationMiddleware, async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const saltRounds = 10;

    if (!username || !password || !email) {
      res.status(400).send("please send mendatory fields !");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).send("SuccessFully Signed up !");
  } catch (error) {
    next(error);
  }
});

app.post("/signin",validationMiddleware, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // const userId = await UserModel.findOne({ email, password });
    const userInfo = await UserModel.findOne({ email });
    if(!userInfo){
       return res.status(403).send("Incorrect Credentials !");
    }
    const match = await bcrypt.compare(password, userInfo.password);
    if (match) {
      const encodedToken = jwt.sign({ userId: userInfo._id }, jwtsecret);
      res
        .status(200)
        .json({ message: "SuccessFully signed in !", token: encodedToken });
    } else {
      res.status(403).send("Incorrect Credentials !");
    }
  } catch (error) {
    next(error);
  }
});

app.use(auth);

app.get("/todos", async (req, res, next) => {
  try {
    const { userId } = req.headers;

    const resp = await TodoModel.find({ userId });
    const todos =
      resp &&
      resp.map((todo) => {
        return {
          id: todo._id,
          title: todo.title,
          completed: todo.completed,
          created: new Date(todo.createdAt).toUTCString(),
          updated: new Date(todo.updatedAt).toUTCString(),
        };
      });
    res.status(200).json({ todos });
  } catch (error) {
    next(error);
  }
});

app.post("/todos/add", async (req, res, next) => {
  try {
    const { userId } = req.headers;
    const { title } = req.body;

    const newTodo = {
      title,
      userId,
    };
    await TodoModel.create(newTodo);
    res.status(201).send("Successfully todo is added !");
  } catch (error) {
    next(error);
  }
});

app.put("/todos/update", async (req, res, next) => {
  try {
    const { todoId: id, completed } = req.body;

    const resp = await TodoModel.findByIdAndUpdate(id, {
      completed,
      updatedAt: Date.now(),
    });
    if (resp) {
      res.sendStatus(204);
    } else {
      next("Todo doesnt exist");
    }
  } catch (error) {
    next(error);
  }
});

app.delete("/todos/delete/:todoId", async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const resp = await TodoModel.findByIdAndDelete(todoId);
    if (resp) {
      res.sendStatus(204);
    } else {
      next("Todo doesnt exist");
    }
  } catch (error) {
    next(error);
  }
});
app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
