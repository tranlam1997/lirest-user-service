import { DataSource, DataSourceOptions } from 'typeorm';
import { logger } from './winston';
import config from 'config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import signer from '../common/aws/genToken';
import { readFileSync } from 'fs';
import { join } from 'path';

const dbLogger = logger('Database');
let dataSource: DataSource;

async function connectToDb(this: any): Promise<void> {
  const cert = readFileSync(join(process.cwd(), `/certs/global-bundle.pem`)).toString();
  const token = await signer.getAuthToken();

  dataSource = new DataSource({
    type: 'postgres',
    host: config.get('postgres.host'),
    port: config.get('postgres.port'),
    username: config.get('postgres.username'),
    password: token,
    database: config.get('postgres.database'),
    schema: config.get('postgres.schema'),
    ssl: {
      rejectUnauthorized: true,
      requestCert: true,
      ca: cert,
    },
    synchronize: true,
    migrationsRun: true,
    entities: ['**/*.entity.ts'],
    // migrations: ['../migrations/*.ts'],
    namingStrategy: new SnakeNamingStrategy(),
  } as DataSourceOptions);

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
