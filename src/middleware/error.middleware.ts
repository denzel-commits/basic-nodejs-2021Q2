import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
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

export { errorMiddleware };