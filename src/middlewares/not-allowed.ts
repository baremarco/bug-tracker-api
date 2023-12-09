import type { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

export const methodNotAllowed = (req: Request, res: Response) => {
  res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ msg: 'Method not allowd for this route' });
};
