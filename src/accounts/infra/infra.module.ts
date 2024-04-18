import { Module } from '@nestjs/common';
import { FirebaseModule } from '../../common/firebase/firebase.module';
import { MongoDBModule } from './mongoDB/mongodb.module';

const modules = [FirebaseModule, MongoDBModule];
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class InfraModule {}
