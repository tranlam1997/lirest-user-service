import { Router } from 'express';
import { validateRequestData } from '@src/middlewares/request-validator.middleware';
import { UsersController } from '@src/modules/users/users.controller';
import { UserSchema } from '@src/modules/users/users.schema';
import { UsersMiddleware } from '@src/modules/users/users.middleware';
import { asyncHandler } from '@src/shared/helper';

const router = Router();
export default (): Router => {
  /**
   * @description Get user by id
   */
  router
    .route('/:id')
    .get(
      asyncHandler(
        [UsersMiddleware.checkIfUserExists],
        UsersController.getUserById,
      ),
    );

  /**
   * @description Update user
   */
  router
    .route('/')
    .put(
      asyncHandler(
        [
          validateRequestData(UserSchema),
          UsersMiddleware.checkIfUserExists,
        ],
        UsersController.updateUser,
      ),
    );

  return router;
};
