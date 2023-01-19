import { TYPES } from './types/users-inversify.types';
import { Container } from 'inversify';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';

export const UsersContainer = (container: Container) => {
  container.bind<UsersService>(TYPES.UsersService).to(UsersService);
  container.bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository);
  container.bind<UsersController>(TYPES.UsersController).to(UsersController);
  container.bind<User>(TYPES.User).to(User);
};