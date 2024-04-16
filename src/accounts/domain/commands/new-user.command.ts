import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirebaseAuthService } from '../../infra/firebase/services/firebase-auth.service';

@Injectable()
export class NewUserCommand {
  private readonly logger = new Logger(NewUserCommand.name);
  public onSuccess: (response: any) => void;

  public constructor(
    @Inject(FirebaseAuthService)
    private readonly firebaseAuthService: FirebaseAuthService,
  ) {}

  public async execute(data: any) {
    this.logger.debug('Criando novo usuário...');
    const createdCredentials = await this.firebaseAuthService.signUp(
      data.email,
      data.password,
    );

    return this.onSuccess(createdCredentials);
  }
}
