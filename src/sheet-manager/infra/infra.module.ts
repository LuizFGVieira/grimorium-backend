import { Module } from '@nestjs/common';
import { MongoDBModule } from './mongoDB/mongodb.module';

const modules = [MongoDBModule];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class InfraModule {}
