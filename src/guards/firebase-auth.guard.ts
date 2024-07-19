import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authorization.split(' ')[1];

    try {
      request.user = await admin.auth().verifyIdToken(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
