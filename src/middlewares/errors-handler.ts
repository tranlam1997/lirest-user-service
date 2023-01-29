import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../errors/exceptions/http-exceptions';
import { logger } from '../common/winston';
import { ResultResponse } from '../shared/response-format';

const ErrorHandlerLogger = logger('Error');
// global error handler
export default function errorHandlerMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpException) {
    ErrorHandlerLogger.error({
      message: JSON.stringify(err.response.message),
      stack: err.stack,
    });

    return ResultResponse.error(res, {
      statusCode: err.response.statusCode,
      response: err.response,
    })
  }

  if (err instanceof Error) {
    ErrorHandlerLogger.error({
      message: JSON.stringify(err.message),
      stack: err.stack,
    });

    return ResultResponse.error(res, {
      statusCode: 500,
      response: {
        message: JSON.stringify(err.message),
      },
    })
  }

  return next();
}
