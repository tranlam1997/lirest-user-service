import { UsersRepository } from './users.repository';
import { IUserEntity } from './users.interface';
import { BadRequestException } from '../../errors/exceptions/bad-request.exception';
import { User } from './users.entity';
import { UpdateResult } from 'typeorm';

export const UsersService = {
  async getUserByEmail(email: string): Promise<User> {
    const user = await UsersRepository.findOne({ where: { email } });

    if(!user) throw new BadRequestException('User not found');

    return user;
  },

  async getUserById(id: string): Promise<User> {
    const user = await UsersRepository.findById(id);

    if(!user) throw new BadRequestException('User not found');

    return user;
  },

  async updateUser(userId: string, data: Partial<IUserEntity>): Promise<UpdateResult> {
    return UsersRepository.update({ id: userId }, data);
  },
};
