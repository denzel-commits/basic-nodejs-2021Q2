import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

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

  public useFastify() {
    const useFastify = this.getValue('USE_FASTIFY', false);
    return useFastify === 'true';
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

      entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
      migrations: ['dist/migration/*{.ts,.js}'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: this.isProduction(),
    };
  }

  public getWinstonOptions(): winston.LoggerOptions {
    const combined_log = this.getValue('COMBINED_LOG');
    const error_log = this.getValue('ERROR_LOG');

    return {
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new winston.transports.File({ filename: combined_log, level: 'info' }),
        new winston.transports.File({ filename: error_log, level: 'error' }),
      ],
      // other options
    };
  }
}

const configuration = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configuration };
