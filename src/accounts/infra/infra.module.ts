import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';

const modules = [FirebaseModule];
@Module({
  imports: [...modules],
  exports: [...modules],
})
export class InfraModule {}
