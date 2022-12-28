import { NextFunction } from 'express';
import { BaseResponse } from '@src/base/response.base';
import { BadRequestException } from '@src/errors/exceptions/bad-request.exception';
import { UserAlreadyExistsException, UserNotFoundException } from './users.exception';
import { ICreateUserRequest, IGetUserByIdRequest } from './users.interface';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

export const UsersMiddleware = {
  checkIfUserAlreadyExists: async (
    req: ICreateUserRequest,
    _res: BaseResponse,
    next: NextFunction,
  ) => {
    const user = await UsersRepository.findOne({
      where: [
        { email: req.body.email },
        { username: req.body.username },
        { phoneNumber: req.body.phoneNumber },
      ],
    });
    if (user) {
      throw new UserAlreadyExistsException('User already exists');
    }
    next();
  },

  checkIfUserExists: async (req: IGetUserByIdRequest, _res: BaseResponse, next: NextFunction) => {
    if (req.accessTokenDecoded?.userId !== req.params.id) {
      throw new BadRequestException('Invalid user id');
    }
    const user = UsersService.getUserById(req.params.id);
    if (!user) {
      throw new UserNotFoundException('User not found');
    }
    req.data = user;
    next();
  },
};
