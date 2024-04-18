import { Module } from '@nestjs/common';
import { sheetsMongoDBProvider } from './providers/sheets-mongodb.providers';
import { sheetProviders } from './providers/sheet.providers';
import { SheetService } from './services/sheet.service';
import { SharedModule } from '../../../common/shared.module';

const mongooseProviders = [sheetsMongoDBProvider, ...sheetProviders];
const mongooseServices = [SheetService];

@Module({
  imports: [SharedModule],
  providers: [...mongooseProviders, ...mongooseServices],
  exports: [...mongooseProviders, ...mongooseServices],
})
export class MongoDBModule {}
