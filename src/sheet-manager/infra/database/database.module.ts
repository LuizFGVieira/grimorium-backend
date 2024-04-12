import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.providers';
import { sheetProviders } from './providers/sheet.providers';
import { SheetService } from './services/sheet.service';

const mongooseProviders = [...databaseProviders, ...sheetProviders];
const mongooseServices = [];

@Module({
  providers: [...mongooseProviders, ...mongooseServices, SheetService],
  exports: [...mongooseProviders, ...mongooseServices, SheetService],
})
export class DatabaseModule {}
