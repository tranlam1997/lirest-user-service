import KafkaConsumer from '@src/common/kafka/consumer';
import subscribeTopics from '@src/common/kafka/subscribers';
import messagesHandler from '@src/common/kafka/handlers';

export default async function kafkaBootstrap() {
    // load kafka consumer
    await KafkaConsumer.consumer.connect();
    // subscribe kafka topics
    await subscribeTopics();
    // handle kafka messages
    await messagesHandler();
}