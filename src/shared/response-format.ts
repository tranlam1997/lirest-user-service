import { Response } from 'express';
import { HttpStatusCode } from '@src/errors/errors.enum';

export interface Result<T = Record<string, never>> {
  statusCode?: HttpStatusCode;
  response?: {
    statusCode?: HttpStatusCode;
    message?: string;
    data?: T;
  }
}

export class ResultResponse {
  static info<T = Record<string, never>>(
    res: Response,
    data: Result<T>
  ) {
    const { statusCode = HttpStatusCode.OK, response } = data;
    const defaultResult = {
      statusCode,
      message: 'Success',
      data: {},
    }
    if(!response) {
      return res.status(statusCode).json(defaultResult);
    }

    return res.status(statusCode).json({
      ...defaultResult,
      ...response,
    });
  }

  static error<T = Record<string, never>>(
    res: Response,
    data: Result<T>
  ) {
    const { statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR, response } = data;
    const defaultResult = {
      statusCode,
      message: 'Error',
      data: {},
    }
    if(!response) {
      return res.status(statusCode).json(defaultResult);
    }

    return res.status(statusCode).json({
      ...defaultResult,
      ...response,
    });

  }
}
