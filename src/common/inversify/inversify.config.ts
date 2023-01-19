import { Container } from 'inversify';
import { UsersContainer } from '../../modules/users/users.module';

export const ServiceContainer = (container: Container) => {
  UsersContainer(container)
};