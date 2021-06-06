import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import winston from 'winston';

function loggerMiddleware(request: Request, response: Response, next: NextFunction): void{
    const requestLog = 'winston-request.log';
    const start = Date.now();
    const datetime = new Date(start).toUTCString();

    const {method, url} = request;
    const bodyData = JSON.stringify(request.body);
    const queryParams = JSON.stringify(request.query);  
    
    next();

    finished(response, () => {
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
              new winston.transports.File({ filename: `./logs/${requestLog}` }),
            ],
          });

        const ms = Date.now() - start;

        const {statusCode} = response;
        const log = `[${ datetime }] ${ method }: ${ url } Query params: ${ queryParams } Body: ${ bodyData } Response Status Code: ${ statusCode } [${  ms  }ms]`;

        logger.add(new winston.transports.Console({
              format: winston.format.simple(),
        }));

        logger.info(log);
    });
}

export { loggerMiddleware };