import { createKafkaConsumer, KafkaConsumer } from '@tranlam1997/lirest-event-pub-sub';
import { kafkaConfig } from './config';

class UserKafkaConsumer {
  public readonly consumer: KafkaConsumer;

  constructor() {
    this.consumer = createKafkaConsumer({
      kafkaConfig,
    });
  }
}

export default new UserKafkaConsumer();