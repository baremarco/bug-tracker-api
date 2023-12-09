import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import type { CreateBug, IQueryObject } from '../types/types';
import { BadRequestError } from '../errors';
import { findBugs, saveBug } from '../services/bug.service';
import { isNotEmpty } from 'class-validator';
import { DATE_REGEX } from '../utils/constants';

export const create = async (req: Request, res: Response): Promise<void> => {
  const { user: userId, project: projectId, description }: CreateBug = req.body;
  const savedBug = await saveBug(userId, projectId, description);
  res.status(StatusCodes.CREATED).json({ savedBug });
};

export const list = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { project_id, user_id, start_date, end_date } = req.query;
  if (Object.keys(req.query).length < 1) {
    throw new BadRequestError('at least one parameter is required');
  }

  const queryObject: IQueryObject = {};

  if (isNotEmpty(project_id)) {
    queryObject.projectId = Number(project_id);
  }
  if (isNotEmpty(user_id)) {
    queryObject.userId = Number(user_id);
  }
  if (isNotEmpty(start_date) && typeof start_date === 'string') {
    if (!DATE_REGEX.test(start_date)) {
      throw new BadRequestError('Date format must be YYYY-MM-DD');
    }
    queryObject.startDate = new Date(start_date);
  }
  if (isNotEmpty(end_date) && typeof end_date === 'string') {
    if (!DATE_REGEX.test(end_date)) {
      throw new BadRequestError('Date format must be YYYY-MM-DD');
    }
    queryObject.endDate = new Date(end_date);
  }

  const bugs = await findBugs(queryObject);
  res.status(200).json({ bugs });
};

export const update = (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO update logic
  res.status(200).json({ message: 'bug updated', payload: id });
};

export const remove = (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO remove logic
  res.status(200).json({ message: 'bug deleted', payload: id });
};
