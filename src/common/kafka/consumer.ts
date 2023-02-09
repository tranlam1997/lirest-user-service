import {
  createKafkaConsumer,
  KafkaConsumer as KafkaConsumerInst,
  ProducerRecordMessageHeaders,
} from '@tranlam1997/lirest-event-pub-sub';
import { kafkaConfig } from './config';

class KafkaConsumer {
  private readonly consumer: KafkaConsumerInst;

  constructor() {
    this.consumer = createKafkaConsumer({
      kafkaConfig: {
        ...kafkaConfig,
        customGeneralKafkaConfig: { brokers: [kafkaConfig.serverUrl] },
      },
    });
  }

  public async connect() {
    await this.consumer.connect();
  }

  public async disconnect() {
    await this.consumer.disconnect();
  }

  public async subscribe(topics: string[]) {
    await this.consumer.subscribe({ topics });
  }

  public async runEachMessage(
    callback: (params: {
      data: any;
      metadata: ProducerRecordMessageHeaders;
    }) => Promise<void> | void,
  ) {
      await this.consumer.runEachMessage(callback);
  }

  public getConfigInfo() {
    return this.consumer.getConfigInfo();
  }
}

export default new KafkaConsumer();
