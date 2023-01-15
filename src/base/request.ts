import { Request } from 'express';

export interface BaseRequest extends Request {
  [key: string]: any;
}
