import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { promiseWrapper } from '../common/promise.wrapper';
import { HttpException } from '../exceptions/HTTPException';
import { loginUser } from '../resources/users/user.service';

const router = express.Router();

router.route('/').post(
    promiseWrapper(
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  
    if (req.body === undefined){
      next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
      return; 
    }    

    const accessToken = await loginUser(req.body);
    
    if(accessToken === '') {
        res.status(StatusCodes.FORBIDDEN).json(StatusCodes.FORBIDDEN);           
        return;
    }  
    
    res.status(StatusCodes.OK).json( { token: accessToken } );

  }));


export { router };