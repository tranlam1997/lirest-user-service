import { BaseRepository } from '../../base/repository';
import { User } from './users.entity';

export const UsersRepository = BaseRepository<User>(User)
