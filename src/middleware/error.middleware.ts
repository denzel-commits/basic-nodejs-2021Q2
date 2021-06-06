/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import winston from 'winston';
import { HttpException } from '../exceptions/HTTPException';

  function errorMiddleware(error: Error | HttpException, _request: Request, response: Response, next: NextFunction): void {
      
    if(error instanceof HttpException){
      const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
      const message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

      response
        .status(status)
        .json({
          status,
          message,
        })

      return;  
    }   

    next(error);
  }

  const errorLog = 'winston-error.log';

  const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.json()),
    defaultMeta: { service: 'user-service' },
    transports: [
    new winston.transports.File({ filename: `./logs/${errorLog}`, level: 'error' }),
    ],
    exitOnError: true,
});

errorLogger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));


  process.on('unhandledRejection', (reason, p) => {

     console.error(reason, 'Unhandled Rejection at Promise', p);
    
      errorLogger.error(reason);

      process.exit(1);
  });

  process.on('uncaughtException', error => {

    console.error(error, 'Uncaught Exception thrown');

    errorLogger.error(error);

    process.exit(1);
  });

export { errorMiddleware };