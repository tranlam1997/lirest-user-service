import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../errors/exceptions/http-exceptions';
import { logger } from '../common/winston';

const ErrorHandlerLogger = logger('ErrorHandler');
// global error handler
export default function errorHandlerMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof HttpException) {
    ErrorHandlerLogger.error(err.response);
    res.status(err.response.statusCode).send(err.response);
  }

  if (err instanceof Error) {
    ErrorHandlerLogger.error(err.message);
    res.status(500).send({ statusCode: 500, message: err.message });
  }
}
