import { Module } from '@nestjs/common';
import { FirebaseModule } from '../infra/firebase/firebase.module';
import { NewUserController } from './controllers/new-user.controller';
import { NewUserCommand } from './commands/new-user.command';

@Module({
  imports: [FirebaseModule],
  controllers: [NewUserController],
  providers: [NewUserCommand],
})
export class DomainModule {}
