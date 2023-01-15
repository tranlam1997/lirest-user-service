import rateLimit, { Options } from 'express-rate-limit';
import cors, { CorsOptions } from 'cors';
import config from 'config';

// cors
const corsMiddleware = cors({
  origin: config.get('cors.allowedOrigins'),
  optionsSuccessStatus: 200,
} as CorsOptions);
// limit 1000 requests per day
const rateLimitMiddleware = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 1000,
  message: 'You have exceeded the requests limit!. Try again in 24 hours',
  standardHeaders: true,
  legacyHeaders: false,
} as Options);

export default [corsMiddleware, rateLimitMiddleware];
