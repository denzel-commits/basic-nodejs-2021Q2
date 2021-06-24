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

    next();
  }

  process.on('unhandledRejection', (reason, p) => {   

    console.error(reason, 'Unhandled Rejection at Promise', p);
       
    winstonLogger.error(reason);      
    
    setTimeout( () => process.exit(1), 100);
  });
  
  process.on('uncaughtException', error => {

    winstonLogger.error(error.message);

    setTimeout( () => process.exit(1), 100);
      
  });


export { errorMiddleware };