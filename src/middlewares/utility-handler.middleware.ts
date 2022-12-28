import express from 'express';
import { expressLogger } from '@src/common/logger-config';

export const UtilityHandlerMiddlewares: any = [
  express.json(),
  express.static('public'),
  expressLogger,
];
