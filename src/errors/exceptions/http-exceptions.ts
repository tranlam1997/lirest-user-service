import { isObject } from '@src/shared/helper';
import { HttpStatusCode, HttpStatusCodeMessages } from '../errors.enum';

export class HttpException extends Error {
  public readonly response: Record<string, any>;

  constructor(response: Record<string, any>) {
    super();
    this.response = response;
    Error.captureStackTrace(this, this.constructor);
  }

  static createBody(objectOrError: string | Record<string, any>, statusCode: HttpStatusCode) {
    if (!objectOrError) {
      return { statusCode, message: HttpStatusCodeMessages.get(statusCode) };
    }
    return isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: HttpStatusCodeMessages.get(statusCode) };
  }
}
