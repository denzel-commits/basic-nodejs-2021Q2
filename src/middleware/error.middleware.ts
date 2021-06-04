import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpException } from '../exceptions/HTTPException';

  function errorMiddleware(error: HttpException, _request: Request, response: Response, next: NextFunction): void {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
    
    response
      .status(status)
      .json({
        status,
        message,
      })

    next();
  }

export { errorMiddleware };