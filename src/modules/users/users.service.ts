import { UsersRepository } from './users.repository';
import { BadRequestException } from '../../errors/exceptions/bad-request-exception';
import { User } from './users.entity';
import { UpdateResult } from 'typeorm';
import { ProducerRecordMessageHeaders } from '@tranlam1997/lirest-event-pub-sub';
import { logger } from '@src/common/winston';

const usersLogger = logger('users-service');

export const UsersService = {
  async createUser({
    data,
    metadata,
  }: {
    data: DeepPartial<User>;
    metadata: ProducerRecordMessageHeaders;
  }): Promise<void> {
    try {
      const user = await UsersRepository.create(data);

      if (!user) throw new BadRequestException('Error creating user');

      usersLogger.info(`User created: ${user.id}`);

    } catch (err) {
      usersLogger.error(err);
    }
  },

  async getUserByEmail(email: string): Promise<User> {
    const user = await UsersRepository.findOne({ where: { email } });

    if (!user) throw new BadRequestException('User not found');

    return user;
  },

  async getUserById(id: string): Promise<User> {
    const user = await UsersRepository.findById(id);

    if (!user) throw new BadRequestException('User not found');

    return user;
  },

  async updateUser(userId: string, data: DeepPartial<User>): Promise<UpdateResult> {
    return UsersRepository.update({ id: userId }, data);
  },
};
