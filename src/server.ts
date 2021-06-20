/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { PORT } from './common/config';
import {app} from './app';

app.listen(PORT || 4000, () =>
  console.log( `App is running on http://localhost:${PORT}` )
  );