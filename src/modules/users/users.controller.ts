import { UsersService } from './users.service';
import express from 'express';
import { IGetUserByIdRequest, IUpdateUserRequest } from './users.interface';

export const UsersController = {
  getUserById: async (req: IGetUserByIdRequest, res: express.Response) => {
    const user = await UsersService.getUserById(req.params.id);
    return res.status(200).send(user);
  },

  updateUser: async (req: IUpdateUserRequest, res: express.Response) => {
    const { affected: isSuccess } = await UsersService.updateUser(req.params.userId, req.body);
    return res.status(isSuccess ? 200 : 400).send({ success: isSuccess ? true : false });
  },
};
