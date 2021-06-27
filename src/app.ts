import express from 'express';
import swaggerUI, { JsonObject } from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { errorMiddleware, loggerMiddleware, authenticateToken } from './middleware';
import { router as loginRouter } from './middleware/login.middleware';
import { router as userRouter } from './resources/users/user.router';
import { router as boardRouter } from './resources/boards/board.router';
import { router as taskRouter } from './resources/tasks/task.router';

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

app.use('/login', loginRouter);
app.use(authenticateToken);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use('/failed', () => process.exit(2));

app.use(errorMiddleware);

export { app };
