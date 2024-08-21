import { Injectable, Logger } from '@nestjs/common';
import {
  IdTokenResult,
  createUserWithEmailAndPassword as createUser,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseService } from './firebase.service';

@Injectable()
export class FirebaseAuthService {
  private readonly logger = new Logger(FirebaseAuthService.name);
  private readonly firebaseAuth;

  constructor(private readonly firebaseService: FirebaseService) {
    this.firebaseAuth = getAuth(this.firebaseService.getFirebaseApp());
  }

  public async signUp(email: string, password: string): Promise<IdTokenResult> {
    try {
      this.logger.debug('Registrando credenciais de usuário no firebase...');
      const userCredential = await createUser(
        this.firebaseAuth,
        email,
        password,
      );
      return userCredential.user.getIdTokenResult();
    } catch (error) {
      this.logger.error(
        'Erro ao registrar credenciais de usuário no firebase: ',
        error,
      );
      throw new Error(error);
    }
  }

  public async signIn(email: string, password: string): Promise<IdTokenResult> {
    try {
      this.logger.debug('Fazendo login de usuário no firebase...');
      return (
        await signInWithEmailAndPassword(this.firebaseAuth, email, password)
      ).user.getIdTokenResult();
    } catch (error) {
      this.logger.error('Erro ao logar usuário no firebase: ', error);
      throw new Error(error);
    }
  }
}
