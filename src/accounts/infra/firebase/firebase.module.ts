import { FirebaseService } from './services/firebase.service';
import { Module } from '@nestjs/common';

const services = [FirebaseService];
@Module({
  exports: services,
  providers: services,
})
export class FirebaseModule {}
