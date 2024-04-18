import { Module } from '@nestjs/common';
import { NewSheetController } from './controllers/new-sheet.controller';
import { MongoDBModule as SheetsMongoDBModule} from '../infra/mongoDB/mongodb.module';
import { NewSheetCommand } from './commands/new-sheet.command';
import { FirebaseModule } from '../../common/firebase/firebase.module';
import { MongoDBModule as AccountsMongoDBModule } from '../../accounts/infra/mongoDB/mongodb.module';
import { ListSheetsCommand } from './commands/list-sheets.command';
import { ListSheetsController } from './controllers/list-sheets.controller';
import { UpdateSheetController } from './controllers/update-sheet.controller';
import { UpdateSheetCommand } from './commands/update-sheet.command';

@Module({
  imports: [SheetsMongoDBModule, FirebaseModule, AccountsMongoDBModule],
  controllers: [NewSheetController, ListSheetsController, UpdateSheetController],
  providers: [NewSheetCommand, ListSheetsCommand, UpdateSheetCommand],
})
export class DomainModule {}
