import { ErrorRequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { winstonLogger } from '../common/winston.logger';
import { HttpException } from '../exceptions/HTTPException';

  const  errorMiddleware: ErrorRequestHandler = (error: Error | HttpException, _request, response, next) => {
      
    if(error instanceof HttpException){
      const {status, message} = error;
      response.status(status).json({status, message});    
    }else {
      const status = StatusCodes.INTERNAL_SERVER_ERROR;
      const message = ReasonPhrases.INTERNAL_SERVER_ERROR;

      response.status(status).json({status, message});
    }

    winstonLogger.error(error.message);
    return;

    next();
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