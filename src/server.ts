/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createConnection } from "typeorm";
import { PORT } from './common/config';
import { app } from './app';

createConnection()
  .then( () => { 
      console.log( 'Connected to DB' );

      app.listen(PORT, () =>
      console.log( `App is running on http://localhost:${PORT}` )
      );
  })
  .catch( (error) =>  {
    console.log('Error while connecting to the database', error);
  });
