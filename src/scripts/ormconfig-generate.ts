import { configService } from '../config/database.config';
import * as fs from 'fs';

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2),
);
