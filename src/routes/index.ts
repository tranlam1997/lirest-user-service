import UsersRoutes from './users';
import { Application } from 'express';
import config from 'config';
import { openAPISpecification, swaggerUIOptions } from '@src/common/swagger/swagger.config';
import swaggerUI from 'swagger-ui-express';
import basicAuth from '../middlewares/basic-auth';
import ErrorHandlerMiddlewares from '../middlewares/errors-handler';
import UtilityHandlerMiddlewares from '../middlewares/utility-handler';
import requestInspectionMiddleware from '../middlewares/request-inspection';

const baseUrl = config.get<string>('service.baseUrl');

export default (app: Application): void => {
  app.use(UtilityHandlerMiddlewares);
  app.use(requestInspectionMiddleware)
  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });
  app.get(`${baseUrl}/ping`, (_req, res) => {
    res.send('pong');
  });
  app.use('/api-docs', swaggerUI.serve, [
    basicAuth,
    swaggerUI.setup(openAPISpecification, swaggerUIOptions),
  ]);
  app.use(`${baseUrl}/users`, UsersRoutes());
  app.use(ErrorHandlerMiddlewares);
};
