import { EntityTarget } from 'typeorm';
import { BaseRepository } from '../../base/repository';
import { User } from './users.entity';
import {inject} from 'inversify';
import { ProvideSingleton } from '@src/decorators/provide-singleton';

@ProvideSingleton(UsersRepository)
export class UsersRepository extends BaseRepository<User> {
  constructor(@inject(User) userEntity: EntityTarget<User>) {
    super(userEntity.constructor);
  }
}
