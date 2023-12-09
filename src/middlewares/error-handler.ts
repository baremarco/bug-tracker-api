import { type Request, type Response, type NextFunction } from 'express';
import { CustomError } from '../errors/custom-api';
import { StatusCodes } from 'http-status-codes';
export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
};
