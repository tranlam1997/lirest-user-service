import { UsersRepository } from './users.repository';
import { BadRequestException } from '../../errors/exceptions/bad-request-exception';
import { User } from './users.entity';
import { UpdateResult } from 'typeorm';
import { inject, injectable } from 'inversify';
import { TYPES } from './types/users-inversify.types';

@injectable()
export class UsersService {
  constructor(
    @inject(TYPES.UsersRepository) private readonly usersRepository: UsersRepository,
  ) {}

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if(!user) throw new BadRequestException('User not found');

    return user;
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if(!user) throw new BadRequestException('User not found');

    return user;
  }

  public async updateUser(userId: string, data: DeepPartial<User>): Promise<UpdateResult> {
    return this.usersRepository.update({ id: userId }, data);
  }
}
