import { Injectable, Logger } from '@nestjs/common';
import admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class FirebaseAdminService {
  private readonly logger = new Logger(FirebaseAdminService.name);

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }

  public async verifyToken(token: string): Promise<DecodedIdToken> {
    this.logger.debug('Validando token JWT de usuário...');
    try {
      return await admin.auth().verifyIdToken(token);
    } catch (error) {
      this.logger.error('Token expirado ou inválido', error);
      throw new Error(error);
    }
  }

  public async delete(uid: string): Promise<void> {
    this.logger.debug(`Deletando usuário ${uid} do Firebase...`);
    try {
      return await admin.auth().deleteUser(uid);
    } catch (error) {
      this.logger.error('Erro ao deletar usuário do Firebase', error);
      throw new Error(error);
    }
  }
}
