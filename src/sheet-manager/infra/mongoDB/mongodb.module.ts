import { Module } from '@nestjs/common';
import { sheetsMongoDBProvider } from './providers/sheets-mongodb.providers';
import { sheetProviders } from './providers/sheet.providers';
import { SheetService } from './services/sheet.service';
import { CommonModule } from '../../../common/common.module';
import { dnd5eCharacterSheetProviders } from './providers/dnd5e-character-sheet.providers';
import { DND5eCharacterSheetService } from './services/dnd5e-character-sheet.service';

const mongooseProviders = [sheetsMongoDBProvider, ...sheetProviders, ...dnd5eCharacterSheetProviders];
const mongooseServices = [SheetService, DND5eCharacterSheetService];

@Module({
  imports: [CommonModule],
  providers: [...mongooseProviders, ...mongooseServices],
  exports: [...mongooseProviders, ...mongooseServices],
})
export class MongoDBModule {}
