import { HttpStatusCode } from '../errors.enum';
import { HttpException } from './http-exceptions';

export class BadRequestException extends HttpException {
  constructor(objectOrError: string | Record<string, any>) {
    super(HttpException.createBody(objectOrError, HttpStatusCode.BAD_REQUEST));
  }
}
