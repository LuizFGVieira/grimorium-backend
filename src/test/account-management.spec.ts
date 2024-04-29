import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { SheetManagerModule } from '../sheet-manager/sheet-manger.module';
import { AccountsTest, UserTestCredentials } from './children/accounts.test';
import { AccountsModule } from '../accounts/accounts.module';
import { UserService } from '../accounts/infra/mongoDB/services/user.service';
import { FirebaseAdminService } from '../common/firebase/services/firebase-admin.service';
import { CommonModule } from '../common/common.module';

describe('End2End : Fluxo de gerenciamento de conta', () => {
  let app: INestApplication;

  let firebaseAdminService: FirebaseAdminService;
  let userService: UserService;

  let accounts: AccountsTest;

  let userCredentials: UserTestCredentials;
  let accessToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SheetManagerModule, AccountsModule, CommonModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();

    accounts = new AccountsTest();
    userService = moduleRef.get<UserService>(UserService);
    firebaseAdminService =
      moduleRef.get<FirebaseAdminService>(FirebaseAdminService);
    return;
  }, 10000);

  it('[POST:201] /accounts/new-user', async () => {
    userCredentials = await accounts.newUserTest(app);
    expect(userCredentials).toBeDefined();
    return;
  });

  it('[POST:201] /accounts/login', async () => {
    accessToken = await accounts.loginTest(userCredentials, app);
    expect(accessToken).toBeDefined();
    return;
  });


  afterAll(async () => {
    if (userCredentials) {
      const decodedToken = await firebaseAdminService.verifyToken(accessToken);
      await firebaseAdminService.delete(decodedToken.uid);

      const user = await userService.findByEmail(userCredentials.email.toLowerCase());
      await userService.delete(user._id);
    }
    return;
  }, 10000);
});
