import { connectToDb } from "@src/common/typeorm.config";
import { Application } from "express";
import { RegisterRoutes } from "../routes";

export default async function bootstrap(app: Application) {
  // connect to db
  await connectToDb();
  // set up routes
  RegisterRoutes(app)
}
