import dotenv from 'dotenv';
import path from 'path';

const DIR_NAME =  path.resolve(path.dirname(''));

dotenv.config({
  path: path.join(DIR_NAME, './.env'),
});

const { PORT, NODE_ENV, JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export { PORT, NODE_ENV, JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB };
