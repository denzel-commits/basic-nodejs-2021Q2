import { configuration } from '../config/configuration';
import * as fs from 'fs';

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configuration.getTypeOrmConfig(), null, 2),
);
