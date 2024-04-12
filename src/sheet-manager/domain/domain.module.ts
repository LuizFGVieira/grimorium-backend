import { Module } from '@nestjs/common';
import { NewSheetController } from './controllers/sheet/new-sheet.controller';
import { DatabaseModule } from '../infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NewSheetController],
  providers: [],
})
export class DomainModule {}
