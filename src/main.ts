import express from 'express';
import config from 'config';
import { logger } from './common/winston.config';
import 'reflect-metadata';
import requestTracingMiddleware from './middlewares/request-tracing';
import { createLightship } from 'lightship';
import { ServiceContainer } from './common/inversify.config';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

const MainLogger = logger('Main');

(async () => {
  let app: express.Application = express();
  const port = config.get('service.port');
  const container = new Container();
  app.use(requestTracingMiddleware());

  ServiceContainer(container);
  const inversifyServer = new InversifyExpressServer(container);

  inversifyServer.setConfig(async (app: express.Application) => {
    await import('./shared/bootstrap').then((bootstrap) => bootstrap.default(app));
  });

  app = inversifyServer.build();
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
