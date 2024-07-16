import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class MessagesService {
  async sendMessage(
    text: string,
    senderId: string,
    receiverId: string,
    fileUrl: string | null,
  ) {
    await admin.firestore().collection('messages').add({
      text,
      senderId,
      receiverId,
      fileUrl,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  async getMessages(senderId: string, receiverId: string) {
    const snapshot = await admin
      .firestore()
      .collection('messages')
      .where('senderId', 'in', [senderId, receiverId])
      .where('receiverId', 'in', [senderId, receiverId])
      .orderBy('timestamp')
      .get();

    return snapshot.docs.map((doc) => doc.data());
  }

  async deleteMessage(id: string) {
    await admin.firestore().collection('messages').doc(id).delete();
  }
}
