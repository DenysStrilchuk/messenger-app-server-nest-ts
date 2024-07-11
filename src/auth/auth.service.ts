import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  async register(email: string, password: string): Promise<any> {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email,
    });
    return { uid: userRecord.uid };
  }
  async login(token: string): Promise<any> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return { uid: decodedToken.uid };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
