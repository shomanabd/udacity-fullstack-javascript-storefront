import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../modules/user";

const tokenSecret = process.env.TOKEN_SECRET;

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    jwt.verify(token, tokenSecret as string);

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const generateTokenForUser = (user: User): string => {
  const token = jwt.sign({ user }, tokenSecret as string);
  return token;
};
