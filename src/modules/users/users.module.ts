import { TYPES } from './types/users.types';
import { Container } from 'inversify';
import { UsersService } from './users.service';

export const UsersContainer = (container: Container) => {
  container.bind<UsersService>(TYPES.UsersService).to(UsersService);
  // container.bind<UsersController>(TYPES.UsersController).to(UsersController);
};