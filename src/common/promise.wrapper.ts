import {Request, Response, NextFunction, RequestHandler} from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const promiseWrapper = (fn: AsyncRequestHandler): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
         fn(req, res, next).catch(next);
    }

export { promiseWrapper };