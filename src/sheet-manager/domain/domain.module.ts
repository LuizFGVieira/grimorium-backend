import { Module } from '@nestjs/common';
import { NewSheetController } from './controllers/new-sheet.controller';
import { MongoDBModule as SheetsMongoDBModule } from '../infra/mongoDB/mongodb.module';
import { NewSheetCommand } from './commands/new-sheet.command';
import { FirebaseModule } from '../../common/firebase/firebase.module';
import { MongoDBModule as AccountsMongoDBModule } from '../../accounts/infra/mongoDB/mongodb.module';
import { ListSheetsCommand } from './commands/list-sheets.command';
import { ListSheetsController } from './controllers/list-sheets.controller';
import { UpdateSheetController } from './controllers/update-sheet.controller';
import { UpdateSheetCommand } from './commands/update-sheet.command';
import { DeleteSheetController } from './controllers/delete-sheet.controller';
import { DeleteSheetCommand } from './commands/delete-sheet.command';
import { DND5eCharacterSheetCommand } from './commands/dnd5e-character-sheet.command';
import { GetSheetDetailsCommand } from './commands/get-sheet-details.command';
import { GetSheetsDetailsController } from './controllers/get-sheet-details.controller';

@Module({
  imports: [SheetsMongoDBModule, FirebaseModule, AccountsMongoDBModule],
  controllers: [
    NewSheetController,
    ListSheetsController,
    UpdateSheetController,
    DeleteSheetController,
    GetSheetsDetailsController,
  ],
  providers: [
    NewSheetCommand,
    ListSheetsCommand,
    UpdateSheetCommand,
    DeleteSheetCommand,
    GetSheetDetailsCommand,
    DND5eCharacterSheetCommand,
  ],
})
export class DomainModule {}
