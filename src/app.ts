import express from 'express';
import swaggerUI, { JsonObject } from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import fs from 'fs';
import { errorMiddleware } from './middleware/error.middleware';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';
import { loggerMiddleware } from './middleware/logger.middleware';


const DIR_NAME =  path.resolve(path.dirname(''));

const app = express();
const swaggerDocument = YAML.load(path.join(DIR_NAME, './doc/api.yaml')) as JsonObject;

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(loggerMiddleware);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(errorMiddleware);

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);

    const state = {reason, p};

   fs.writeFileSync("error.log", `Unhandled Rejection at Promise: ${JSON.stringify(state)}` + 
   ` Exception origin: ${JSON.stringify(p)}\n`, { flag: "a+" });

    // process.exit(1);
  })
  .on('uncaughtException', error => {

    console.error(error, 'Uncaught Exception thrown');
    fs.writeFileSync("error.log", error.message, { flag: "a+" });

    process.exit(1);
  });

export { app };
