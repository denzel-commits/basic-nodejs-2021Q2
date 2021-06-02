import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

function errorMiddleware(error: string, _request: Request, response: Response, next: NextFunction) {

    if(error === 'NOT_FOUND'){
        response.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
    }

    response.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something broke!');

    next();
  }

export default errorMiddleware;