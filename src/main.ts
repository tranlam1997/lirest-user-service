import express from 'express';
import config from 'config';
import { logger } from './common/logger-config';
import 'reflect-metadata';
import { connectToDb } from './common/database-config';
import setUpRoutes from './routes';

(async () => {
  const app: express.Application = express();
  const port = config.get('service.port');
  await connectToDb();
  setUpRoutes(app);
  app.listen(process.env.PORT || port, async () => {
    await import('./communication/server');
    logger('Main').info(
      `Service running at https://${config.get('service.host')}:${process.env.PORT || port}`,
    );
  });
})();
