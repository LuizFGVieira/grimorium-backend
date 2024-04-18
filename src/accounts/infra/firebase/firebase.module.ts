import { FirebaseAdminService } from './services/firebase-admin.service';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { FirebaseService } from './services/firebase.service';
import { Module } from '@nestjs/common';

const services = [FirebaseService, FirebaseAuthService, FirebaseAdminService];
@Module({
  exports: services,
  providers: services,
})
export class FirebaseModule {}
