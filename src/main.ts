import express from 'express';
import config from 'config';
import { logger } from './common/winston.config';
import 'reflect-metadata';
import requestTracingMiddleware from './middlewares/request-tracing';
import { createLightship } from 'lightship';
import { ServiceContainer } from './common/inversify/inversify.config';
import { iocContainer } from './common/inversify/ioc';

const MainLogger = logger('Main');

(async () => {
  const app: express.Application = express();
  const port = config.get('service.port');
  app.use(requestTracingMiddleware());

  ServiceContainer(iocContainer);

  await import('./shared/bootstrap').then((bootstrap) => bootstrap.default(app));

  const lightship = await createLightship();

  const expressServer = app
    .listen(process.env.PORT || port, async () => {
      // await import('./communication/server');
      MainLogger.info(
        `Service running at https://${config.get('service.host')}:${process.env.PORT || port}`,
      );
    })
    .on('error', () => {
      MainLogger.error('Unable to start server');
      lightship.shutdown();
    });

  lightship.registerShutdownHandler(() => {
    expressServer.close();
  });
})();
