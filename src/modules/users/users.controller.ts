import { UsersService } from './users.service';
import { Request, Response, Router } from 'express';
import { asyncHandler } from '@src/shared/helper';

const UsersRouter = Router();

export default (app: Router) => {
  UsersRouter.get(
    '/:id',
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
