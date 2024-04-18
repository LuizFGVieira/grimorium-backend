import { Module } from '@nestjs/common';
import { NewSheetController } from './controllers/new-sheet.controller';
import { MongoDBModule as SheetsMongoDBModule} from '../infra/mongoDB/mongodb.module';
import { NewSheetCommand } from './commands/new-sheet.command';
import { FirebaseModule } from '../../accounts/infra/firebase/firebase.module';
import { MongoDBModule as AccountsMongoDBModule } from '../../accounts/infra/mongoDB/mongodb.module';

@Module({
  imports: [SheetsMongoDBModule, FirebaseModule, AccountsMongoDBModule],
  controllers: [NewSheetController],
  providers: [NewSheetCommand],
})
export class DomainModule {}
