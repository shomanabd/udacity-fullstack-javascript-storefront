import { Request, Response } from "express";
import { UserStore, User } from "../modules/user";

const user = new UserStore();

export const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await user.index();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const usr = await user.show(id);
    res.json(usr);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const newUser = await user.create(userData);
    res.status(201).json({ token: newUser });
  } catch (err) {
    res.status(400).json(err);
  }
};
