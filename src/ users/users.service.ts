import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  async getAllUsers(): Promise<User[]> {
    const usersSnapshot = await admin.firestore().collection('users').get();
    return usersSnapshot.docs.map(
      (doc) => ({ uid: doc.id, ...doc.data() }) as User,
    );
  }

  async getUser(uid: string): Promise<admin.auth.UserRecord> {
    return await admin.auth().getUser(uid);
  }

  async updateUser(uid: string, data: Partial<User>): Promise<{ uid: string }> {
    await admin.auth().updateUser(uid, data);
    await admin.firestore().collection('users').doc(uid).update(data);
    return { uid };
  }

  async deleteUser(uid: string): Promise<void> {
    await admin.auth().deleteUser(uid);
    await admin.firestore().collection('users').doc(uid).delete();
  }

  async clearUsersCollection(): Promise<void> {
    const usersSnapshot = await admin.firestore().collection('users').get();
    const batch = admin.firestore().batch();
    usersSnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
}
