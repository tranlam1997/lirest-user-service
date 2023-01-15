import { HttpStatusCode } from '../errors.enum';
import { HttpException } from './http-exceptions';

export class InternalServerErrorException extends HttpException {
  constructor(objectOrError: string | Record<string, any>) {
    super(HttpException.createBody(objectOrError, HttpStatusCode.INTERNAL_SERVER_ERROR));
  }
}
