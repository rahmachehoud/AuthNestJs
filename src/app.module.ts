import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://rahmakechich:rahma123@cluster0.l8mc2tz.mongodb.net/'), UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
