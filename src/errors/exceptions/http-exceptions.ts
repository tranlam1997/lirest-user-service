import { isObject, isString } from '@src/shared/helper';
import { HttpStatusCode, HttpStatusCodeMessages } from '../errors.enum';

export class HttpException extends Error {
  private readonly response: string | Record<string, any>;

  constructor(response: string | Record<string, any>) {
    super();
    this.response = response;
  }

  initMessage(): void {
    if (isString(this.response)) {
      this.message = this.response;
    } else if (isObject(this.response)) {
      this.message = this.response.message;
    } else if (this.constructor) {
      this.message = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') || 'Error';
    }
  }

  static createBody(objectOrError: string | Record<string, any>, statusCode?: HttpStatusCode) {
    if (!objectOrError) {
      return { statusCode, message: HttpStatusCodeMessages.get(statusCode) };
    }
    return isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: HttpStatusCodeMessages.get(statusCode) };
  }
}
