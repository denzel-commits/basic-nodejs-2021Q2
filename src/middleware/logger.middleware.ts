import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import fs from 'fs';

function loggerMiddleware(request: Request, response: Response, next: NextFunction): void{
    const requestLog = 'request.log';
    // const errorLog = 'error.log';
    const start = Date.now();
    const datetime = new Date(start).toUTCString();

    const {method, url} = request;
    const bodyData = JSON.stringify(request.body);
    const queryParams = JSON.stringify(request.query);  
    
    next();

    finished(response, () => {
        const ms = Date.now() - start;

        const {statusCode} = response;
        const log = `[${ datetime }] ${ method }: ${ url } Query params: ${ queryParams } Body: ${ bodyData } Response Status Code: ${ statusCode } [${  ms  }ms]`;

        console.log(log);

        fs.appendFile(requestLog, `${log  }\n`, err => {
            if (err) {
              console.log(err);
            }
          });
    });
}

export { loggerMiddleware };