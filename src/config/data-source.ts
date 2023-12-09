import { DataSource } from 'typeorm';
// import { User } from './entities/user.entity';
import path from 'path';

const entitiesPath = path.resolve('src/entities/*{.js,.ts}');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'bugsmanager',
  synchronize: true,
  logging: false,
  entities: [entitiesPath],
  subscribers: [],
  migrations: []
});
