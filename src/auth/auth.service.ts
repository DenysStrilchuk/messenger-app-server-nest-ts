import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async register(email: string, password: string): Promise<UserRecord> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRecord = await admin.auth().createUser({
      email,
      password: hashedPassword,
    });
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email,
      password: hashedPassword,
    });
    return userRecord;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await admin.auth().getUserByEmail(email);
    const userDoc = await admin.firestore().collection('users').doc(user.uid).get();
    const userData = userDoc.data();

    if (!userData || !userData.password) {
      throw new Error('User not found or password is missing');
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return await admin.auth().createCustomToken(user.uid);
  }
}
