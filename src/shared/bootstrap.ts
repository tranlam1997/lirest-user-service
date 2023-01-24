import { connectToDb } from '@src/common/typeorm';
import { Application } from 'express';
import UtilityMiddleware from '../middlewares//utility-handler';
import RequestInspectionMiddleware from '../middlewares/request-inspection';
import ErrorHandlerMiddleware from '../middlewares/errors-handler';
import loadSwaggerUI from '../common/swagger/swagger';
import ResourceHandler from '../middlewares/resource-handler';
import Controllers from '../controllers';
import keycloak from '../common/keycloak';

export default async function bootstrap(app: Application) {
  // connect to db
  await connectToDb();
  // load swagger ui
  loadSwaggerUI(app);
  // set up keycloak
  await keycloak(app);
  // set up middlewares
  app.use(UtilityMiddleware);
  app.use(RequestInspectionMiddleware);
  // set up apis
  Controllers(app);
  app.use(ResourceHandler);
  app.use(ErrorHandlerMiddleware);
}
