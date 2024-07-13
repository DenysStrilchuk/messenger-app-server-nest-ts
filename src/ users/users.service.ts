import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  async getUser(uid: string): Promise<any> {
    return await admin.auth().getUser(uid);
  }

  async updateUser(uid: string, data: any): Promise<any> {
    await admin.auth().updateUser(uid, data);
    await admin.firestore().collection('users').doc(uid).update(data);
    return { uid };
  }

  async deleteUser(uid: string): Promise<void> {
    await admin.auth().deleteUser(uid);
    await admin.firestore().collection('users').doc(uid).delete();
  }
}
