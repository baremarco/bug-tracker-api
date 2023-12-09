import { type Request, type Response } from 'express';
import { findProjects } from '../services/project.service';

export const list = async (_req: Request, res: Response) => {
  const projects = await findProjects();
  res.status(200).json({ projects });
};
