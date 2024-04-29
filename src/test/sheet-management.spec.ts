import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { SheetManagerModule } from '../sheet-manager/sheet-manger.module';
import { SheetService } from '../sheet-manager/infra/mongoDB/services/sheet.service';
import { SheetManagerTest } from './children/sheet-manager.test';
import { AccountsTest, UserTestCredentials } from './children/accounts.test';
import { AccountsModule } from '../accounts/accounts.module';
import { UserService } from '../accounts/infra/mongoDB/services/user.service';
import { FirebaseAdminService } from '../common/firebase/services/firebase-admin.service';
import { CommonModule } from '../common/common.module';

describe('End2End : Fluxo de gerenciamento de fichas', () => {
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
    firebaseAdminService =
      moduleRef.get<FirebaseAdminService>(FirebaseAdminService);

    userCredentials = await accounts.newUserTest(app);
    accessToken = await accounts.loginTest(userCredentials, app);
    return;
  }, 10000);

  it('[POST:201] /sheets/new-sheet', async () => {
    createdSheetId = await sheetManager.newSheetTest(app, accessToken);
    expect(createdSheetId).toBeDefined();
    return;
  });

  it('[GET:200] /sheets/list', async () => {
    await sheetManager.listSheetsTest(app, accessToken, createdSheetId);
    return;
  });

  it('[PUT:204] /sheets/update-sheet/:sheetId', async () => {
    await sheetManager.updateSheetTest(app, accessToken, createdSheetId);
    return;
  });

  it('[DELETE:204] /sheets/delete-sheet/:sheetId', async () => {
    const isSuccessfull = await sheetManager.deleteSheetTest(app, accessToken, createdSheetId);
    if(isSuccessfull) {
      createdSheetId = null;
    }
    return;
  });

  afterAll(async () => {
    if (userCredentials) {
      const decodedToken = await firebaseAdminService.verifyToken(accessToken);
      await firebaseAdminService.delete(decodedToken.uid);

      const user = await userService.findByEmail(userCredentials.email.toLowerCase());
      await userService.delete(user._id);
    }
    if(createdSheetId) {
      await sheetService.delete(createdSheetId);
    }
    return;
  }, 10000);
});
