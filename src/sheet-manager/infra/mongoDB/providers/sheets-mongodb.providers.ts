import mongoose from 'mongoose';
import { MongoDBProvider } from '../../../../common/mongoDB/mongodb.provider';

export const sheetsMongoDBProvider = {
  provide: 'SHEETS_DATABASE_CONNECTION',
  useFactory: async (): Promise<mongoose.Connection> => {
    return mongoose.connection.useDb('sheets');
  },
  inject: [MongoDBProvider.provide],
};
