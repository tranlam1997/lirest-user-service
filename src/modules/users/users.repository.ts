import { EntityTarget } from 'typeorm';
import { BaseRepository } from '../../base/repository';
import { User } from './users.entity';
import {inject, injectable} from 'inversify';
import { TYPES } from './types/users-inversify.types';

@injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(@inject(TYPES.User) userEntity: EntityTarget<User>) {
    super(userEntity.constructor);
  }
}
