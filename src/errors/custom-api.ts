export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  constructor(message: string) {
    super(message);
  }
}
