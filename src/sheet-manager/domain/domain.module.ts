import { Module } from '@nestjs/common';
import { NewSheetController } from './controllers/new-sheet.controller';
import { MongoDBModule } from '../infra/mongoDB/mongodb.module';
import { NewSheetCommand } from './commands/new-sheet.command';

@Module({
  imports: [MongoDBModule],
  controllers: [NewSheetController],
  providers: [NewSheetCommand],
})
export class DomainModule {}
