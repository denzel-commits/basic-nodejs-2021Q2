import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { JWT_ACCESS_SECRET_KEY } from '../common/config';
import { HttpException } from '../exceptions/HTTPException';

const authenticateToken: RequestHandler = (req, _res, next): void => {

  const authHeader = req.headers.authorization;
  const authScheme = authHeader && authHeader.split(' ')[0];
  const token = authHeader && authHeader.split(' ')[1];

  if ( !token || authScheme !== "Bearer" ) {    
    next(new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED));
    return;
  }  

  if(token !== undefined)
  jwt.verify(token, JWT_ACCESS_SECRET_KEY as string, (err) => {

    if (err) {
      // console.log(err);

      next(new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED))      
      return;
    }  

    // req.user = user;

    next();
  })
}

export { authenticateToken };