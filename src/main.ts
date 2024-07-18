import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard'; // Импортируйте guard

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
  app.useGlobalGuards(new FirebaseAuthGuard());

  await app.listen(3000);
}

void bootstrap();
