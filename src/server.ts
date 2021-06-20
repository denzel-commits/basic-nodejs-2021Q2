/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createConnection } from "typeorm";
import { PORT } from './common/config';
import { ormconfig } from './common/ormconfig';
import { app } from './app';

  createConnection(ormconfig)
  .then( () => { 
      console.log( 'Database connection is set successfully' );

      app.listen(PORT || 4000, () =>
      console.log( `App is running on http://localhost:${PORT}` )
      );
  })
  .catch( (error) =>  {
    console.log('Error while connecting to the database', error);
  });

