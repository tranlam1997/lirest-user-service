import { HttpStatusCode } from '@src/errors/errors.enum';

export interface IResultResponse<T = Record<string, never>> {
  statusCode: HttpStatusCode;
  message: string;
  data: T;
}

export class ResultResponse {
  static send<T = Record<string, never>>(
    data: T,
    message = 'Success',
    statusCode = HttpStatusCode.OK,
  ): IResultResponse<T> {
    return {
      statusCode,
      message,
      data,
    };
  }
}
