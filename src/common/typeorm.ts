import { DataSource, DataSourceOptions } from 'typeorm';
import { logger } from './winston';
import config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dbLogger = logger('Database');
const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: config.get('postgres.host'),
  port: config.get('postgres.port'),
  username: config.get('postgres.username'),
  password: config.get('postgres.password'),
  database: config.get('postgres.database'),
  schema: config.get('postgres.schema'),
  synchronize: true,
  migrationsRun: true,
  entities: ['**/*.entity.ts'],
  // migrations: ['../migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
} as DataSourceOptions);

async function connectToDb(this: any): Promise<void> {
  dbLogger.info('Connecting to database...');
  try {
    await dataSource.initialize();
    dbLogger.info('Database connected');
  } catch (error) {
    const retryInterval = 5000;
    dbLogger.error(`Database connection fail with ${error}, retrying in ${retryInterval}ms...`);
    setTimeout(connectToDb.bind(this), retryInterval);
  }
  return;
}

export { connectToDb, dataSource };
