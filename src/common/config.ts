import dotenv from 'dotenv';
import path from 'path';

const DIR_NAME =  path.resolve(path.dirname(''));

dotenv.config({
  path: path.join(DIR_NAME, './.env'),
});

const { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE } = process.env;

export { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE };
