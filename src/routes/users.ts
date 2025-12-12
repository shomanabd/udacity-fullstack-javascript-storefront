import { index, show, create } from "../controllers/userController";
import express from "express";
import { verifyAuthToken } from "../middleware/auth";

const usersRouter = express.Router();

usersRouter.get("/", verifyAuthToken, index);
usersRouter.get("/:id", verifyAuthToken, show);
usersRouter.post("/", create);

export default usersRouter;
