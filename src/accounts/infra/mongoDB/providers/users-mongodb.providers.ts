// sheets-database.provider.ts
import mongoose from 'mongoose';
import { MongoDBProvider } from '../../../../common/mongoDB/mongodb.provider';

export const usersMongoDBProvider = {
  provide: 'USERS_DATABASE_CONNECTION',
  useFactory: async (): Promise<mongoose.Connection> => {
    return mongoose.connection.useDb('users');
  },
  inject: [MongoDBProvider.provide],
};
