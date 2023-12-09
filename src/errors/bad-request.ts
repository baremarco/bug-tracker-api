import { CustomError } from './custom-api';
import { StatusCodes } from 'http-status-codes';

export class BadRequestError extends CustomError {
  readonly statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
