import { Response } from 'express';

export interface BaseResponse extends Response {
  [key: string]: any;
}
