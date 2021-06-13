/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { winstonLogger } from '../common/winston.logger';
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

  
  process.on('unhandledRejection', (reason, p) => {

     console.error(reason, 'Unhandled Rejection at Promise', p);
    
     winstonLogger.error(reason);      

      process.exit(1);
  });

  process.on('uncaughtException', error => {

    console.error(error, 'Uncaught Exception thrown');

    winstonLogger.error(error);

    process.exit(1);
  });

export { errorMiddleware };