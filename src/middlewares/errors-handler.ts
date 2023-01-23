import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../errors/exceptions/http-exceptions';
import { logger } from '../common/winston';
import { ValidateError } from 'tsoa';
import { ResultResponse } from '../shared/response-format';

const ErrorHandlerLogger = logger('ErrorHandler');
// global error handler
export default function errorHandlerMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpException) {
    ErrorHandlerLogger.error({
      message: err.message,
      stack: err.stack,
    });

    return ResultResponse.error(res, {
      statusCode: err.response.statusCode,
      response: err.response,
    })
  }
  // tsoa validation error
  if (err instanceof ValidateError) {
    ErrorHandlerLogger.error(`Caught Validation Error for ${req.path}:`, err.fields);
    return ResultResponse.error(res, {
      statusCode: 422,
      response: {
        message: 'Validation Failed',
        data: err?.fields,
      },
    })
  }

  if (err instanceof Error) {
    ErrorHandlerLogger.error({
      message: err.message,
      stack: err.stack,
    });

    return ResultResponse.error(res, {
      statusCode: 500,
      response: {
        message: err.message,
      },
    })
  }

  return next();
}
