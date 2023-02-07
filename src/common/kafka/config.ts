import { KafkaConfig } from '@tranlam1997/lirest-event-pub-sub';
import config from 'config';

export const kafkaConfig: KafkaConfig & { groupId: string } = config.get('kafka');