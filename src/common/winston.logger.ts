import winston from 'winston';

const errorLog = 'winston-error.log';
const requestLog = 'winston-request.log';

const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.json()
    ),
    defaultMeta: { service: 'rest-service' },
    transports: [
    new winston.transports.File({ filename: `./logs/${requestLog}`, level: 'info' }),    
    new winston.transports.File({ filename: `./logs/${errorLog}`, level: 'error' }),
    ],  
    exitOnError: true  
});

winstonLogger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));

export {winstonLogger};