// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import firebaseConfig from './config/firebase.config';
import { UsersModule } from './ users/users.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [firebaseConfig],
    }),
    AuthModule,
    UsersModule,
    MessagesModule,
  ],
})
export class AppModule {}
