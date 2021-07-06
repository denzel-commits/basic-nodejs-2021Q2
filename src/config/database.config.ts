import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/resources/users/entities/user.entity';
import { Task } from 'src/resources/tasks/entities/task.entity';
import { Board } from 'src/resources/boards/entities/board.entity';

import * as dotenv from 'dotenv';
import * as path from 'path';

const DIR_NAME = path.resolve(path.dirname(''));

dotenv.config({
  path: path.join(DIR_NAME, './.env'),
});

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('NODE_ENV', false);
    return mode != 'development';
  }

  public runMigrations() {
    const migrations = this.getValue('RUN_MIGRATIONS', false);
    return migrations === 'true';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      synchronize: false,
      migrationsRun: this.runMigrations(),

      // entities: [path.join(__dirname, '..', '*.entity.{ts,js}')],
      // entities: [path.join(DIR_NAME, '**', '*.entity.{ts,js}')],
      // entities: [
      //   path.join(DIR_NAME, 'src/model/*.ts'),
      //   path.join(DIR_NAME, 'dist/model/*.js'),
      // ],

      entities: [User, Task, Board],

      migrations: ['dist/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
