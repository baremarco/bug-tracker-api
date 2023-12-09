import { type Request, type Response } from 'express';
import { findUsers } from '../services/user.service';

export const list = async (_req: Request, res: Response) => {
  const users = await findUsers();
  res.status(200).json({ users });
};
