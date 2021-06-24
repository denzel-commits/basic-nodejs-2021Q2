import { ConnectionOptions } from 'typeorm';
import { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PORT, POSTGRES_PASSWORD, POSTGRES_DB } from './src/common/config';

const ormconfig: ConnectionOptions = {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: +POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    synchronize: false,
    "entities": ["src/entity/*.ts"],
    "migrations": ["src/migration/*.ts"],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",  
    }
};

export = ormconfig;