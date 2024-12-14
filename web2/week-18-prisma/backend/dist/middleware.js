"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const isAuthenticatedUser = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (isAuthenticatedUser) {
            req.headers.userId = isAuthenticatedUser.userId;
            next();
        }
    }
    catch (error) {
        console.log('Error: ', error);
        res.sendStatus(403);
    }
};
exports.authMiddleware = authMiddleware;
