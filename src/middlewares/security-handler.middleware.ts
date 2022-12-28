import rateLimit, { Options } from 'express-rate-limit';
import cors, { CorsOptions } from 'cors';
import config from 'config';

export const corsMiddleware = cors({
  origin: config.get('cors.allowedOrigins'),
  optionsSuccessStatus: 200,
} as CorsOptions);

export const rateLimitMiddleware = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1000,
  message: 'You have exceeded the requests limit!. Try again in 24 hours',
  standardHeaders: true,
  legacyHeaders: false,
} as Options);

export const SecurityHandlerMiddleware = [corsMiddleware, rateLimitMiddleware];
