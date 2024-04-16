import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirebaseAuthService } from 'src/accounts/infra/firebase/services/firebase-auth.service';

@Injectable()
export class NewUserCommand {
  private readonly logger = new Logger(NewUserCommand.name);
  public onSuccess: (response: any) => void;

  public constructor(
    @Inject(FirebaseAuthService)
    private readonly firebaseAuthService: FirebaseAuthService,
  ) {}

  public async execute(data: any) {
    this.logger.debug('Criando nova ficha...');
    const createdCredentials = await this.firebaseAuthService.register(
      data.email,
      data.password,
    );

    return this.onSuccess(createdCredentials);
  }
}
