import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { SheetManagerModule } from '../sheet-manager/sheet-manger.module';
import { SheetService } from '../sheet-manager/infra/mongoDB/services/sheet.service';
import { SheetManagerTest } from './sheet-manager.test';
import { AccountsTest, UserTestCredentials } from './accounts.test';
import { AccountsModule } from '../accounts/accounts.module';
import { UserService } from '../accounts/infra/mongoDB/services/user.service';
import { FirebaseAdminService } from '..//common/firebase/services/firebase-admin.service';
import { CommonModule } from '../common/common.module';

describe('End2End : Sheets Management Flow', () => {
  let app: INestApplication;

  let firebaseAdminService: FirebaseAdminService;
  let sheetService: SheetService;
  let userService: UserService;

  let sheetManager: SheetManagerTest;
  let accounts: AccountsTest;

  let createdSheetId: string;
  let userCredentials: UserTestCredentials;
  let accessToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SheetManagerModule, AccountsModule, CommonModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();

    sheetManager = new SheetManagerTest();
    accounts = new AccountsTest();
    sheetService = moduleRef.get<SheetService>(SheetService);
    userService = moduleRef.get<UserService>(UserService);
    firebaseAdminService = moduleRef.get<FirebaseAdminService>(FirebaseAdminService);
    return;
  });

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

  it('[POST:201] /sheets/new-sheet', async () => {
    createdSheetId = await sheetManager.newSheetTest(app, accessToken);
    expect(createdSheetId).toBeDefined();
    return;
  });

  it('[GET:200] /sheets/list', async () => {
    await sheetManager.listSheetsTest(app, accessToken, createdSheetId);
    return;
  });

  afterEach(async () => {
    if(userCredentials) {
      const decodedToken = await firebaseAdminService.verifyToken(accessToken);
      await firebaseAdminService.delete(decodedToken.uid);

      const user = await userService.findByEmail(userCredentials.email);
      await userService.delete(user.id);
    }
    if (createdSheetId) {
      await sheetService.delete(createdSheetId);
    }
    return;
  });
});
