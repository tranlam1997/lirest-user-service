import express from 'express';
import Joi from 'joi';
import { BadRequestException } from '@src/errors/exceptions/bad-request.exception';

export const validateRequestData = <T = any>(schema: Joi.ObjectSchema<T>) => {
  return (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new BadRequestException(error.details?.[0]?.message);
    }
    next();
  };
};
