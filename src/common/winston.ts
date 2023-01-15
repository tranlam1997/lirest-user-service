import expressWinston from 'express-winston';
import winston from 'winston';
import cls from 'cls-hooked';
import config from 'config';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, json, colorize } = winston.format;
const requestTracingNamespace = cls.getNamespace('request-tracing');

const formatInfo = printf(({ level, message, ...metadata }) => {
  const { timestamp, serviceName, ...rest } = metadata;
  return `[${serviceName ?? 'General'}] level: ${level}, message: ${message}, ` +
    `${requestTracingNamespace?.get('tracingId') ? `tracingId: ${requestTracingNamespace.get('tracingId')}, ` : ''}` +
    `timestamp: ${timestamp}, data: ${JSON.stringify(rest)}, ` +
    `serverUptime: ${process.uptime()}s`; // server uptime in seconds
});

const transports = {
  fileInfo: new winston.transports.DailyRotateFile({
    filename: 'logs/info/info-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info',
  }),
  fileError: new winston.transports.DailyRotateFile({
    filename: 'logs/error/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error',
  }),
  fileHttp: new winston.transports.DailyRotateFile({
    filename: 'logs/http/http-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'http',
  }),
  console: new winston.transports.Console({
    level: config.get<string>('logLevel'),
    handleExceptions: true,
    handleRejections: true,
  }),
  exception: new winston.transports.File({ filename: 'logs/exceptions.log' }),
  rejection: new winston.transports.File({ filename: 'logs/rejections.log' }),
};

const baseLoggerConfig = {
  format: combine(timestamp(), formatInfo, colorize({ all: true })),
  transports: [transports.console, transports.fileInfo, transports.fileError, transports.fileHttp],
  exceptionHandlers: [transports.exception],
  rejectionHandlers: [transports.rejection],
  exitOnError: false,
} as winston.LoggerOptions;

export const logger = (serviceName: string) => {
  return winston.createLogger(baseLoggerConfig).child({ serviceName });
};

export const expressLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(json(), colorize({ all: true })),
} as expressWinston.LoggerOptions);
