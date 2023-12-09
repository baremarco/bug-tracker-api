import { CustomError } from './custom-api';
import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends CustomError {
  readonly statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
