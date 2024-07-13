// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import firebaseConfig from './config/firebase.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './ users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [firebaseConfig],
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
