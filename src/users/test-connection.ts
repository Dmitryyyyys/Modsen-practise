// test-connection.ts
import { DataSource } from 'typeorm';
import { User } from './user.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: '192.168.1.141',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'mydb',
  synchronize: false,
  entities: [User],
});

dataSource.initialize().then(async () => {
  const users = await dataSource.getRepository(User).find();
  console.log('Found users:', users);
});
