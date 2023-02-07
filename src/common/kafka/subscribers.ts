import KafkaConsumer from '@src/common/kafka/consumer';
import { KafkaTopics } from './topics';

export default async function subscribeTopics() {
  await KafkaConsumer.subscribe([KafkaTopics.USER_REGISTER]);
}