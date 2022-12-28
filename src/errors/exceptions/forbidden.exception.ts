import { HttpStatusCode } from '../errors.enum';
import { HttpException } from './http-exceptions';

export class ForbiddenException extends HttpException {
  constructor(objectOrError: string | Record<string, any>) {
    super(HttpException.createBody(objectOrError, HttpStatusCode.FORBIDDEN));
  }
}
