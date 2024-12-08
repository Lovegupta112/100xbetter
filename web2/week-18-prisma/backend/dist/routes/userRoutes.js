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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
const userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
userRouter.get("/all-users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield prisma.user.findMany();
        res.send(userData);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
userRouter.post('/create-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const userData = yield prisma.user.create({ data: {
                name,
                email,
                password
            } });
        console.log('userData..', userData);
        const token = jsonwebtoken_1.default.sign({ userId: userData.id }, jwtSecret);
        res.setHeader('authorization', `Bearer ${token}`);
        res.status(200).send('User created successfully !');
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
exports.default = userRouter;
