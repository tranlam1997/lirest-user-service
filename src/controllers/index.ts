import { Application, Router } from 'express';
import UsersController from '../modules/users/users.controller';
import config from 'config';
import cors from 'cors';

const router = Router();
const baseUrl = config.get<string>('service.baseUrl');

export default (app: Application) => {
  app.use(cors({
    origin: '*',
  }))
  UsersController(router);
  // test server connection
  app.get(`${baseUrl}/ping`, (_req, res) => {
    res.send('Pong!');
  })
  app.use(baseUrl, router);
}