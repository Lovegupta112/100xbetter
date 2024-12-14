"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const todoRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
todoRouter.get("/all-todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.headers;
        const todos = yield prisma.todo.findMany({
            where: {
                userId: Number(userId)
            }
        });
        res.send(todos);
    }
    catch (error) {
        res.sendStatus(500);
    }
}));
todoRouter.post("/create-todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.headers;
        const { title } = req.body;
        const createdTodo = yield prisma.todo.create({
            data: {
                title,
                userId: Number(userId)
            }
        });
        res.status(200).send('Todo created SuccessFully !');
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
exports.default = todoRouter;
