import { HttpStatusCode } from './../../errors/errors.enum';
export interface ErrorModel {
  statusCode: number;
  message: string;
  data: Record<string, unknown>;
}

export interface BadRequestResponseModel extends ErrorModel {
  statusCode: 400;
  message: 'Bad Request';
}

export interface UnauthorizedResponseModel extends ErrorModel {
  statusCode: 401;
  message: 'Unauthorized';
}

export interface ForbiddenResponseModel extends ErrorModel {
  statusCode: 403;
  message: 'Forbidden';
}

export interface NotFoundResponseModel extends ErrorModel {
  statusCode: 404;
  message: 'Not Found';
}

export interface ValidationFailedResponseModel extends ErrorModel {
  statusCode: 422;
  message: 'Validation Failed';
}

export interface InternalServerErrorResponseModel extends ErrorModel {
  statusCode: 500;
  message: 'Internal Server Error';
}

export type ErrorResponseModel<T extends HttpStatusCode> = T extends 400
  ? BadRequestResponseModel
  : T extends 401
  ? UnauthorizedResponseModel
  : T extends 403
  ? ForbiddenResponseModel
  : T extends 404
  ? NotFoundResponseModel
  : T extends 422
  ? ValidationFailedResponseModel
  : T extends 500
  ? InternalServerErrorResponseModel
  : null;
