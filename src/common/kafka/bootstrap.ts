import KafkaConsumer from '@src/common/kafka/consumer';
import subscribeTopics from '@src/common/kafka/subscribers';
import messagesHandler from '@src/common/kafka/handlers';
import { logger } from '@src/common/winston';

const KafkaBootstrapLogger = logger('KafkaBootstrap');
export default async function kafkaBootstrap() {
  try {
    // load kafka consumer
    await KafkaConsumer.connect();
    KafkaBootstrapLogger.info('Connected consumer to Kafka Server')
    // subscribe kafka topics
    KafkaBootstrapLogger.info('Subscribing topics')
    await subscribeTopics();
    KafkaBootstrapLogger.info('Subscribed topics')
    // handle kafka messages
    await messagesHandler();
  } catch (err) {
    KafkaBootstrapLogger.error(`Error connecting to Kafka Server: ${err}`);
  }
}