import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './apis/users/users.module';
import config from './config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL_TEST),
    UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
