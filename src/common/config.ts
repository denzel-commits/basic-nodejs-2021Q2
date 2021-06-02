import dotenv from 'dotenv';
import path from 'path';

const DIR_NAME =  path.resolve(path.dirname(''));

dotenv.config({
  path: path.join(DIR_NAME, '../.env'),
});

/*
export default { 
  PORT: process.env.['PORT'],
  NODE_ENV: process.env.['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env.['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: process.env.['WT_SECRET_KEY'],
  AUTH_MODE: process.env.['AUTH_MODE'] === 'true',
}; */

/*
export default { 
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
}; */

const  PORT = 4000;
export { PORT };
