import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { JWT_ACCESS_SECRET_KEY } from '../common/config';

const authenticateToken: RequestHandler = (req, res, next): void => {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // if (req.route.path === '/login') {    
  //   next();
  //   return;
  // }  

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({message: ReasonPhrases.UNAUTHORIZED});
    next();
    return;
  }  

  if(token !== undefined)
  jwt.verify(token, JWT_ACCESS_SECRET_KEY as string, (err, user) => {

    if(user !== undefined)
      console.log(user['login']);

    if (err) {
      console.log(err);
      res.status(StatusCodes.UNAUTHORIZED).json({user, message: ReasonPhrases.UNAUTHORIZED}); // FORBIDDEN
      return;
    }  

    // get user from db and set it to request.user for usage?

    // req.user = user;

    next();
  })
}

export { authenticateToken };