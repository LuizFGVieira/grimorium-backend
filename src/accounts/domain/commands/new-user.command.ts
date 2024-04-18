import { Inject, Injectable, Logger } from '@nestjs/common';
import { FirebaseAuthService } from '../../../common/firebase/services/firebase-auth.service';
import { NewUserRequestDTO } from '../dtos/new-user/new-user.request.dto';
import { UserService } from 'src/accounts/infra/mongoDB/services/user.service';
import { NewUserResponseDTO } from '../dtos/new-user/new-user.response.dto';
import { IdTokenResult } from 'firebase/auth';

@Injectable()
export class NewUserCommand {
  private readonly logger = new Logger(NewUserCommand.name);

  public onSuccess: (response: NewUserResponseDTO) => void;
  public onFirebaseError: () => void;

  public constructor(
    @Inject(FirebaseAuthService)
    private readonly firebaseAuthService: FirebaseAuthService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  public async execute(data: NewUserRequestDTO) {
    let createdCredentials: IdTokenResult;
    try {
      createdCredentials = await this.firebaseAuthService.signUp(
        data.email,
        data.password,
      );
    }catch(error) {
      return this.onFirebaseError();
    }

    await this.userService.create(data);
    return this.onSuccess(createdCredentials);
  }
}
