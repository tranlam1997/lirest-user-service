import { Response } from 'express';
import { HttpStatusCode } from '@src/errors/errors.enum';
import { convertNanosecondsToMilliseconds } from './helper';

export interface Result<T = Record<string, never>> {
  statusCode?: HttpStatusCode;
  response?: {
    statusCode?: HttpStatusCode;
    message?: string;
    data?: T;
  };
}

export class ResultResponse {
  static info<T = Record<string, never>>(res: Response, data: Result<T>) {
    const { statusCode = HttpStatusCode.OK, response } = data;
    const defaultResult = {
      statusCode,
      message: 'Success',
      data: {},
    };
    if (!response) {
      return res
        .setHeader(
          'X-Response-Time',
          `${convertNanosecondsToMilliseconds(Number(process.hrtime.bigint() - res.locals.startTime))} ms`,
        )
        .status(statusCode)
        .json(defaultResult);
    }

    return res
      .setHeader(
        'X-Response-Time',
        `${convertNanosecondsToMilliseconds(Number(process.hrtime.bigint() - res.locals.startTime))} ms`,
      )
      .status(statusCode)
      .json({
        ...defaultResult,
        ...response,
      });
  }

  static error<T = Record<string, never>>(res: Response, data: Result<T>) {
    const { statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR, response } = data;
    const defaultResult = {
      statusCode,
      message: 'Error',
      data: {},
    };
    if (!response) {
      return res.status(statusCode).json(defaultResult);
    }

    return res.status(statusCode).json({
      ...defaultResult,
      ...response,
    });
  }
}
