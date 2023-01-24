import { Application, Router } from 'express';
import UsersController from '../modules/users/users.controller';
import AuthController from '../modules/auth/auth.controller';
import config from 'config';

const router = Router();
const baseUrl = config.get<string>('service.baseUrl');

export default (app: Application) => {
  UsersController(router);
  AuthController(router);
  // test server connection
  app.get(`${baseUrl}/ping`, (_req, res) => {
    res.send('Pong!');
  })
  app.use(baseUrl, router);
}