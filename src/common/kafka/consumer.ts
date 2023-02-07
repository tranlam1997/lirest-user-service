import { createKafkaConsumer, KafkaConsumer as KafkaConsumerInst } from '@tranlam1997/lirest-event-pub-sub';
import { kafkaConfig } from './config';

class KafkaConsumer {
  public readonly consumer: KafkaConsumerInst;

  constructor() {
    this.consumer = createKafkaConsumer({
      kafkaConfig: { ...kafkaConfig, customGeneralKafkaConfig: { brokers: [kafkaConfig.serverUrl] } },
    });
  }
}

export default new KafkaConsumer();