import { connectToDb } from "@src/common/typeorm.config";
import { Application } from "express";
import { RegisterRoutes } from "../routes";
import UtilityMiddleware from "../middlewares//utility-handler";
import RequestInspectionMiddleware from "../middlewares/request-inspection";
import ErrorHandlerMiddleware from "../middlewares/errors-handler";

export default async function bootstrap(app: Application) {
  // connect to db
  await connectToDb();
  // set up middlewares
  app.use(UtilityMiddleware);
  app.use(RequestInspectionMiddleware);
  // set up routes
  RegisterRoutes(app)
  app.use(ErrorHandlerMiddleware)
}
