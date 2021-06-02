import {PORT} from './common/config';
import {app} from './app';

console.log( PORT);

app.listen(PORT, () =>
  console.log( `App is running on http://localhost:` )
  );


/*
import express from 'express';
import swaggerUI, { JsonObject } from 'swagger-ui-express';

const DIR_NAME =  path.resolve(path.dirname(''));
 
const app = express();

const swaggerDocument = YAML.load(path.join(DIR_NAME, './doc/api.yaml')) as JsonObject;
 
app.get('/', (request, response) => {
  if (request.originalUrl === '/') {
    response.send('Service is running!');
    return;
  }
  response.send('Hello world!');
});
 
app.listen(5000);
*/