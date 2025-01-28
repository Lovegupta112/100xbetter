import { Request, Response, NextFunction } from "express";
import { JWT_SECRET_KEY } from "@repo/backend-common/config";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  userEmail?: string;
}
const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split("")[1];

    if (!token) {
      res.status(401).send("Token not present.");
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({message:'Invalid Token!'});
  }
};

export default authMiddleware;
