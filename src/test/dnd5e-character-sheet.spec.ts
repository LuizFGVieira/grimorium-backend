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
import { SheetTypes } from '../sheet-manager/common/types/sheets.types';
import { DND5eCharacterSheetService } from '../sheet-manager/infra/mongoDB/services/dnd5e-character-sheet.service';

describe('End2End : Gerenciamento de ficha de personagem de DND5e', () => {
  let app: INestApplication;

  let firebaseAdminService: FirebaseAdminService;
  let sheetService: SheetService;
  let userService: UserService;
  let characterSheetService: DND5eCharacterSheetService;

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
    characterSheetService = moduleRef.get<DND5eCharacterSheetService>(DND5eCharacterSheetService);
    firebaseAdminService =
      moduleRef.get<FirebaseAdminService>(FirebaseAdminService);

    userCredentials = await accounts.newUserTest(app);
    accessToken = await accounts.loginTest(userCredentials, app);
    createdSheetId = await sheetManager.newSheetTest(
      app,
      accessToken,
      'DND5E',
      SheetTypes.CHARACTER,
    );
    return;
  }, 10000);

  it('[GET:200] /sheets/:sheetId/details', async () => {
    await sheetManager.sheetsDetailsTest(app, accessToken, createdSheetId);
    return;
  });

  afterAll(async () => {
    if (userCredentials) {
      const decodedToken = await firebaseAdminService.verifyToken(accessToken);
      await firebaseAdminService.delete(decodedToken.uid);

      const user = await userService.findByEmail(
        userCredentials.email.toLowerCase(),
      );
      await userService.delete(user._id);
    }
    if (createdSheetId) {
      await characterSheetService.delete(createdSheetId);
      await sheetService.delete(createdSheetId);
    }
    return;
  }, 10000);
});
