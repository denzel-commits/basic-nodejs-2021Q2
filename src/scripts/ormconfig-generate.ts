import { configService } from '../config/config';
import * as fs from 'fs';

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
);
