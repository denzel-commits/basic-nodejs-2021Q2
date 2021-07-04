/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createConnection } from "typeorm";
import { PORT } from './common/config';
import { createAdmin } from './common/initdb';
import { app } from './app';

createConnection()
  .then( async () => { 
      console.log( 'Connected to DB' );
      await createAdmin();

      app.listen(PORT, () =>
      console.log( `App is running on http://localhost:${PORT}` )
      );
  })
  .catch( (error) =>  {
    console.log('Error while connecting to the database', error);
  });
