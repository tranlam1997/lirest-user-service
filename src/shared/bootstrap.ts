import { connectToDb } from '@src/common/typeorm';
import { Application } from 'express';
import UtilityMiddleware from '../middlewares//utility-handler';
import RequestInspectionMiddleware from '../middlewares/request-inspection';
import ErrorHandlerMiddleware from '../middlewares/errors-handler';
import loadSwaggerUI from '../common/swagger/swagger';
import ResourceHandler from '../middlewares/resource-handler';
import Controllers from '../controllers';
import kafkaBootstrap from '../common/kafka/bootstrap';

export default async function bootstrap(app: Application) {
  // connect to db
  await connectToDb();
  // load swagger ui
  loadSwaggerUI(app);
  // set up kafka
  await kafkaBootstrap();
  // set up middlewares
  app.use(UtilityMiddleware);
  // log request info
  app.use(RequestInspectionMiddleware);
  // set up apis
  Controllers(app);
  // handle not found resource or api
  app.use(ResourceHandler);
  // global error handler
  app.use(ErrorHandlerMiddleware);
}
