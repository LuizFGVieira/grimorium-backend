import { Module } from '@nestjs/common';
import { sheetsMongoDBProvider } from './providers/sheets-mongodb.providers';
import { sheetProviders } from './providers/sheet.providers';
import { SheetService } from './services/sheet.service';
import { CommonModule } from '../../../common/common.module';
import { dnd5eSheetProviders } from './providers/dnd5e-sheet-details.providers';

const mongooseProviders = [sheetsMongoDBProvider, ...sheetProviders, ...dnd5eSheetProviders];
const mongooseServices = [SheetService];

@Module({
  imports: [CommonModule],
  providers: [...mongooseProviders, ...mongooseServices],
  exports: [...mongooseProviders, ...mongooseServices],
})
export class MongoDBModule {}
