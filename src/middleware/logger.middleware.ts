import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';

function loggerMiddleware(request: Request, response: Response, next: NextFunction): void{
    const {method, url, query} = request;
    const start = Date.now();

    const statusBefore = response.statusCode;

    next();

    finished(response, () => {
        const ms = Date.now() - start;

        const {statusCode} = response;

        console.log(`Status before: ${statusBefore}`);
        console.log(query);
        console.log(`${method} ${url} ${statusCode} [${  ms  }ms]`);
    });
}

export { loggerMiddleware };