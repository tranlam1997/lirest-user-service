import { TYPES } from './types/users-inversify.types';
import { Container } from 'inversify';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

export const UsersContainer = (container: Container) => {
  container.bind<UsersService>(TYPES.UsersService).to(UsersService);
  container.bind<UsersController>(TYPES.UsersController).to(UsersController);
};