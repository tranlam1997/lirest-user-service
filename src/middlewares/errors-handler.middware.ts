import { Request, Response, NextFunction } from 'express';

export const errorLogger = (err: any, _req: Request, _res: Response, next: NextFunction) => {
  console.error('\x1b[31m', err.response);
  next(err);
};

export const errorResponder = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.header('Content-Type', 'application/json');
  res.status(err.response.statusCode).send(err.response);
};

export const ErrorHandlerMiddlewares = [errorLogger, errorResponder];
