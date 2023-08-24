import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from 'src/user/user. entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'Bhargav@2023',
      database: 'demo_nestjs',
      entities: [users],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class DatabaseModule {
  onModuleInit() {
    console.log('Database connection established');
  }
}
