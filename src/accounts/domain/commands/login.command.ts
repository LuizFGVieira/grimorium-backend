import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirebaseAuthService } from '../../infra/firebase/services/firebase-auth.service';
import { LoginRequestDTO } from '../dtos/login/login.request.dto';

@Injectable()
export class LoginCommand {
  private readonly logger = new Logger(LoginCommand.name);
  public onInvalidCredentials: () => void;
  public onSuccess: (response: any) => void;

  public constructor(
    @Inject(FirebaseAuthService)
    private readonly firebaseAuthService: FirebaseAuthService,
  ) {}

  public async execute(data: LoginRequestDTO) {
    try {
      const result = await this.firebaseAuthService.signIn(
        data.email,
        data.password,
      );
      return this.onSuccess(result);
    }catch(error) {
      return this.onInvalidCredentials();
    }
  }
}
