import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { AppModule } from './app.module';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../environments/.env') });

interface FirebaseConfig {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  databaseURL: string;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const firebaseConfig = configService.get<FirebaseConfig>('firebase');

  if (!firebaseConfig) {
    throw new Error('Firebase configuration is missing');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseConfig.project_id,
      clientEmail: firebaseConfig.client_email,
      privateKey: firebaseConfig.private_key,
    }),
    databaseURL: firebaseConfig.databaseURL,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  await app.listen(3000);
}

void bootstrap();
