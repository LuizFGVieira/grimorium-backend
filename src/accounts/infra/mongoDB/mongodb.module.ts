import { Module } from '@nestjs/common';
import { usersMongoDBProvider } from './providers/users-mongodb.providers';
import { userProviders } from './providers/user.providers';
import { UserService } from './services/user.service';
import { SharedModule } from '../../../shared/shared.module';

const mongooseProviders = [usersMongoDBProvider, ...userProviders];
const mongooseServices = [UserService];

@Module({
  imports: [SharedModule],
  providers: [...mongooseProviders, ...mongooseServices],
  exports: [...mongooseProviders, ...mongooseServices],
})
export class MongoDBModule {}
