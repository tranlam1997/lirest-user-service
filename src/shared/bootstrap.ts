import { connectToDb } from "@src/common/typeorm.config";
import { Application } from "express";
import setUpRoutes from '../routes';


export default async function bootstrap(app: Application) {
  // connect to db
  await connectToDb();
  // set up routes
  setUpRoutes(app);
}
