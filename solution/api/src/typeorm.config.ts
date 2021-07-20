import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const port: number = Number(process.env.DB_PORT) || 5432;
const host = process.env.DB_HOST || 'localhost';
const password = process.env.DB_PASSWORD || 'pass';
const database = process.env.DB_NAME || 'aldostore';
const username = process.env.DB_USER || 'postgres';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  synchronize: true,
};

export default typeOrmConfig;
