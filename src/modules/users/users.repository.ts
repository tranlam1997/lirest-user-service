import { BaseRepository } from '../../base/repository';
import { User } from './users.entity';
import {injectable} from 'inversify';

@injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
