import { Injectable, Logger } from '@nestjs/common';
import {
  UserCredential,
  createUserWithEmailAndPassword as createUser,
  getAuth,
} from 'firebase/auth';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FirebaseAuthService {
  private readonly logger = new Logger(FirebaseAuthService.name);
  private readonly firebaseAuth;

  constructor(private readonly firebaseService: FirebaseService) {
    this.firebaseAuth = getAuth(this.firebaseService.getFirebaseApp());
  }

  public async register(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    try {
      this.logger.debug('Registrando credenciais de usuário no firebase...');
      const userCredential = await createUser(
        this.firebaseAuth,
        email,
        password,
      );
      return userCredential;
    } catch (error) {
      this.logger.error(
        'Erro ao registrar credenciais de usuário no firebase: ',
        error,
      );
      throw new Error(error);
    }
  }
}
