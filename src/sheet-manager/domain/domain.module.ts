import { Module } from '@nestjs/common';
import { NewSheetController } from './controllers/new-sheet.controller';
import { DatabaseModule } from '../infra/database/database.module';
import { NewSheetCommand } from './commands/new-seet.command';

@Module({
  imports: [DatabaseModule],
  controllers: [NewSheetController],
  providers: [NewSheetCommand],
})
export class DomainModule {}
