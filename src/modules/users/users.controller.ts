import { UsersService } from './users.service';
import { Request, Response, Router } from 'express';
import { asyncHandler } from '../../shared/helper';
import {passport} from '../../common/keycloak'

const UsersRouter = Router();

export default (app: Router) => {
  UsersRouter.get(
    '/:id',
    passport.authenticate('oidc', { failureRedirect: '/login' }),
    asyncHandler(async (req: Request, res: Response) => {
      const user = await UsersService.getUserById(req.params.id);
      return res.status(200).send(user);
    }),
  );

  UsersRouter.route('/').put(
    asyncHandler(async (req: Request, res: Response) => {
      const user = await UsersService.updateUser(req.query.userId as string, req.body);
      return res.status(201).send(user);
    }),
  );

  app.use('/users', UsersRouter);
};
