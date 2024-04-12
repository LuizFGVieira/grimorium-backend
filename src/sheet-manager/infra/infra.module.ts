import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

const modules = [DatabaseModule];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class InfraModule {}
