import { Module } from '@nestjs/common';
import { FirebaseModule } from '../infra/firebase/firebase.module';
import { NewUserController } from './controllers/new-user.controller';
import { NewUserCommand } from './commands/new-user.command';
import { LoginController } from './controllers/login.controller';
import { LoginCommand } from './commands/login.command';

@Module({
  imports: [FirebaseModule],
  controllers: [NewUserController, LoginController],
  providers: [NewUserCommand, LoginCommand],
})
export class DomainModule {}
