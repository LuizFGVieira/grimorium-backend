import { Module } from '@nestjs/common';
import { usersMongoDBProvider } from './providers/users-mongodb.providers';
import { userProviders } from './providers/user.providers';
import { UserService } from './services/user.service';
import { CommonModule } from '../../../common/common.module';

const mongooseProviders = [usersMongoDBProvider, ...userProviders];
const mongooseServices = [UserService];

@Module({
  imports: [CommonModule],
  providers: [...mongooseProviders, ...mongooseServices],
  exports: [...mongooseProviders, ...mongooseServices],
})
export class MongoDBModule {}
