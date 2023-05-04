import kafkaConsumer from '@src/common/kafka/consumer';
import { logger } from '@src/common/winston';

const processLogger = logger('process');

export default function gracefulShutdown() {
  process.on('unhandledRejection', (reason, p) => {
    processLogger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });

  process.on('uncaughtException', async (err) => {
    processLogger.error('Uncaught Exception thrown', err);
    try {
      processLogger.info('Closing http server.');
      await kafkaConsumer.disconnect();
      process.exit(1);
    } catch (err) {
      processLogger.error(err);
      process.exit(1);
    }
  });
}
