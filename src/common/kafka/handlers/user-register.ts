import KafkaConsumer from '@src/common/kafka/consumer';
import { UsersService } from '@src/modules/users/users.service';

export default async function userRegisterHandler() {
  KafkaConsumer.runEachMessage(UsersService.createUser)
}